import { getOptions, everyCombo } from './generalLib';
import { systemPrompts } from "../hardCoded/systemPrompts"
import { saiaMode } from "../hardCoded/saiaModes"
import { goldenAnswers } from "../hardCoded/goldenAnswers"

// it's just here for reference
const updateSearchProfileObj = 
{
    "name": "string", /* Required */
    "description": "string",
    "searchOptions": {
      "historyCount": "integer",
      "llm": {
        "cache": "boolean",
        "frequencyPenalty": "decimal",
        "maxTokens": "integer",
        "modelName": "string",
        "n": "integer",
        "presencePenalty": "decimal",
        "provider": "string",
        "stream": "boolean",
        "temperature": "decimal",
        "topP": "decimal",
        "verbose": "boolean"
      },
      "search": {
        "k": "integer",
        "prompt": "string",
        "returnSourceDocuments": "boolean",
        "scoreThreshold": "decimal",
        "template": "string"
      },
      "retriever": {
        "type": "string", /* vectorStore, selfQuery, hyde, contextualCompression */
        "prompt": "string" /* not needed when using vectorStore */
      }
    },
    "indexOptions": {
      "chunks": {
        "chunkOverlap": "integer",
        "chunkSize": "integer"
      }
    }
  }


// Get list of all queries from the querySettings (user input)
export function getQueriesList(querySettingsState){
    const options = getOptions(querySettingsState)
    return everyCombo(options)
}


// execute each of the chatbot requests
export async function runQueryProcess(queries, setOutputGraph){
    console.log(queries)
    for (const query of queries){
        await runQuery(query, setOutputGraph)
    }
    console.log("all of the queries have completed")
}

// Change the getChatResponse + updateOutputGraph
async function runQuery(query, setOutputGraph){
    const startTime = Date.now();
        
    const chatResponse = await getChatResponse(query)
    
    const endTime = Date.now();
    const elapsedSeconds = (endTime - startTime) / 1000;

    updateOutputGraph(query, chatResponse, elapsedSeconds, setOutputGraph)
}

// update profile + execute
async function getChatResponse(query) {
    try {
        const profileUpdateStatus = await updateProfile(query);
        
        if (profileUpdateStatus !== "success") {
            return handleError(new Error("error updating profile"));
        }

        const chatResponse = await executeQuery(query);
        return chatResponse;
        
    } catch (error) {
        return handleError(error);
    }
}

// Complicated because there isn't consistency in the received object
function extractChatResponse(data) {
    if (data.error) {
        if (data.result && data.result.messages) {
            if (data.result.messages[0].includes("model's maximum context length is")){
                return { text: "tokenLimit", articles: "" };
            }
            return { text: data.result.messages[0], articles: "" };
        } else if (data.error.message) {
            return { text: data.error.message, articles: "" };
        }
        return { text: data, articles: "" };
    }
    return {
        text: data.text,
        articles: getArticles(data.documents)
    };
}
// prompts the model with the settings that have already been set
async function executeQuery(query) {
    const executeQueryObj = {
        profile: saiaMode.PROFILE,
        question: query.Question
    }

    console.log(query.Question)

    return fetch(saiaMode.EXECUTE_URL, {
        method: "POST",
        headers: saiaMode.HEADERS,
        body: JSON.stringify(executeQueryObj)
    })
    .then(response => response.ok ? response.json() : response.text().then(text => JSON.parse(text)))
    .then(data => extractChatResponse(data))
    .catch(error => {
        console.error("Error en executeQuery:", error.message);
        throw error;
    });
}

async function updateProfile(query){
    const updateProfileBody = getUpdateProfileBody(query)

    return fetch(saiaMode.PUT_URL, {
        method: "PUT",
        headers: saiaMode.HEADERS,
        body: JSON.stringify(updateProfileBody)
    })
    .then(response => {
        if (!response.ok){
            return "error updating profile"
        }
        return "success"
    })
}

function updateOutputGraph(query, chatResponse, elapsedSeconds, setOutputGraph){
    let outputRow = {
        ...query,
        Response: chatResponse.text,
        Articles: chatResponse.articles,
        Duration: elapsedSeconds
    }
    setOutputGraph(prevOutputGraph => [...prevOutputGraph, outputRow]);
}

async function handleError(error) {
    console.error(error);
    return {
        text: error.message || "Unknown error occurred",
        articles: ""
    };
}

function getArticles(documents){
    let output = ""

    console.log("num documents: " + documents.length)

    let curDoc = 1
    for (const document of documents){

        console.log(document)

        let goldenArticles = goldenAnswers.map(item => item.articleIds).reduce((acc, current) => acc.concat(current), []);


        if (goldenArticles.includes(parseInt(document.metadata.id, 10))) {
            // Imprimir description, source y score separados por comas
            console.log(`${document.metadata.description}, ${document.metadata.source}, ${document.score}`);
            console.log("article rank: " + curDoc)
        }

        // console.log("this is the full document", document)

        output += 
        `${document.pageContent.slice(0,100)}

        ${document.metadata.source}

        ##################################
        
        `
        curDoc++
    }
    return output
}


function getUpdateProfileBody(query){
    // query {Question, k, Retriever, Model}
    
    return {
        
        "searchOptions": {
            "llm": {
              "modelName": query.Model,
            },
            "search": {
              "k": query.k,
              "prompt": systemPrompts[query.PromptType],
              "scoreThreshold": query.scoreThreshold,
            },
            "retriever": {
              "type": "vectorStore", /* vectorStore, selfQuery, hyde, contextualCompression */
            }        
          }
    }


}







