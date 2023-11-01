import { saiaMode } from "../hardCoded/saiaModes"
import { goldenAnswers } from "../hardCoded/goldenAnswers"
import { findLastJsonInString } from "./generalLib"

export async function evaluateResponses(unevaluatedResponses){
    let promises = []

    for (const unevaluatedResponse of unevaluatedResponses){
        promises.push(evaluate(unevaluatedResponse))
    }

    return Promise.all(promises)
}

// Returns the same row in the csv but with error messages for all the fields 
function errorResponse(message, response){
    return {
        ...response,
        foundArticle: false,
        eval: "bad",
        confident: message,
        "count-correct": "error",
        "total-correct": "error",
        "count-incorrect": "error",
        "total-incorrect": "error",
    }
}

// Evaluates the response to determine whether it was a real gpt response or some kind of error (tokenLimit, middleware)
function saiaBotError(response) {
    const errorConditions = [
        response === "ChatSearch - Failed to contact middleware",
        response.includes("This model's maximum context length is")
    ];

    return errorConditions.some(condition => condition);
}



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
    
    try {
        const chatResponse = await getChatResponse(evalQuery)
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
        return errorResponse(error.message || "Error during getChatResponse or JsonParse", unevaluatedResponse)
    }
}

// Prompts the response_eval assistant, returns the response
function getChatResponse(prompt){
    return fetch(`${saiaMode.BASE_URL}/v1/assistant/text`,{
        method: 'POST',
        headers: saiaMode.HEADERS,
        body: JSON.stringify({
            assistant: "response_eval",
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



