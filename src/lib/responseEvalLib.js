import { saiaMode } from "../hardCoded/saiaModes"
import { goldenAnswers } from "../hardCoded/goldenAnswers"
import { findLastJsonInString } from "./generalLib"
import { functionLimiter } from "./myBottleneck"

export async function evaluateResponses(unevaluatedResponses){
    let promises = []

    for (const unevaluatedResponse of unevaluatedResponses){
        promises.push(evaluate(unevaluatedResponse))
    }

    return Promise.all(promises)
}

// Returns the same row in the csv but with error messages for all the fields 
function errorResponse(message, response, chatResponse){
    return {
        ...response,
        foundArticle: false,
        eval: "bad",
        confident: message,
        "count-correct": "error",
        "total-correct": "error",
        "count-incorrect": "error",
        "total-incorrect": "error",
        chatResponse: chatResponse || ""
    }
}

// Evaluates the response to determine whether it was a real gpt response or some kind of error (tokenLimit, middleware)
function saiaBotError(response) {
    if (!response){
        return "response is empty"
    }
    
    const errorConditions = [
        response === "ChatSearch - Failed to contact middleware",
        response.includes("This model's maximum context length is")
    ];

    return errorConditions.some(condition => condition);
}


// This is for the classic response Eval
async function evaluate(unevaluatedResponse) {
    if (saiaBotError(unevaluatedResponse.Response)){
        return errorResponse("saiaBotError", unevaluatedResponse)
    }
    
    
    const goldenAnswer = goldenAnswers.find(item => item.question === unevaluatedResponse.Question);
    if (!goldenAnswer) {
        return errorResponse("GoldenAnswer not found", unevaluatedResponse)
    }
    const foundArticle = articleIsContained(unevaluatedResponse.Articles, goldenAnswer.articleIds);
    const evalQuery = `${goldenAnswer.points}\nAnswer: """${unevaluatedResponse.Response}"""`
    
    let chatResponse = ""

    try {
        const limitedGetChatResponse = functionLimiter(getChatResponse, 750)
        chatResponse = await limitedGetChatResponse(evalQuery, "response_eval")
        
        const gptJSON = findLastJsonInString(chatResponse)
        console.log(unevaluatedResponse.Question)
        console.log(gptJSON)
        return {
            ...unevaluatedResponse, 
            "foundArticle": foundArticle,
            "eval": getQualityColor(gptJSON, goldenAnswer.evaluateJSON),
            ...gptJSON,
            "chatResponse": chatResponse
        };
    } catch (error) {
        return errorResponse(error.message || "Error during getChatResponse or JsonParse", unevaluatedResponse, chatResponse)
    }
}

// This is for the self eval
// async function evaluate(unevaluatedResponse) {
//     if (saiaBotError(unevaluatedResponse.Response)){
//         console.log("saiaBotErrorBaby")
//         return errorResponse("saiaBotError", unevaluatedResponse)
//     }
    
//     let chatResponse = ""

//     const evalQuery = `
//     Question: """
//         ${unevaluatedResponse.Question}
//     """
//     Response: """
//         ${unevaluatedResponse.Response}
//     """
//     Articles: """
//         ${unevaluatedResponse.fullArticles}
//     """`
//     try {
//         const limitedGetChatResponse = functionLimiter(getChatResponse, 10000)
//         chatResponse = await limitedGetChatResponse(evalQuery, "self_eval")
        
//         const gptJSON = findLastJsonInString(chatResponse)
//         console.log(unevaluatedResponse.Question)
//         console.log(gptJSON)
//         return {
//             ...unevaluatedResponse, 
//             ...gptJSON,
//             "chatResponse": chatResponse
//         };
//     } catch (error) {
//         return errorResponse(error.message || "Error during getChatResponse or JsonParse", unevaluatedResponse, chatResponse)
//     }
// }


// Prompts the response_eval assistant, returns the response
function getChatResponse(prompt, assistant){
    return fetch(`${saiaMode.BASE_URL}/v1/assistant/text`,{
        method: 'POST',
        headers: saiaMode.HEADERS,
        body: JSON.stringify({
            assistant: assistant,
            prompt: prompt
        })
    }).then(response => {
        if (!response.ok) {
            console.log(response.json())
            throw new Error('Http error! status: ' + response.status)
        }
        return response.json()
    }).then(data => {
        return JSON.parse(data.providerResponse).choices[0].message.content
    })
}


// Returns whether an article is contained in a list of articles
function articleIsContained(responseArticles, goldenAnswerIds){
    for (const articleId of goldenAnswerIds){
        if (responseArticles.includes(articleId)){
            return true
        }
    }
    return false
}

// Based on a JSON evaluation of a response and guidelines on how to evaluate the JSON, returns the quality of the response
function getQualityColor(gptJSON, evaluateJSON){
    if (gptJSON['count-correct'] >= evaluateJSON.green.minimumCorrect && gptJSON['count-incorrect'] <= evaluateJSON.green.maximumIncorrect){
        return StatusEnum.GREEN
    }
    else if (!gptJSON['confident'] || (gptJSON['count-correct'] >= evaluateJSON.yellow.minimumCorrect && gptJSON['count-incorrect'] <= evaluateJSON.yellow.maximumIncorrect)){
        return StatusEnum.YELLOW
    }
    else{
        return StatusEnum.RED
    }
}


const StatusEnum = Object.freeze({
    GREEN: "good",
    YELLOW: "ok",
    RED: "bad"
});



