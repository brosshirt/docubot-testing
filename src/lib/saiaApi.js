let PROFILE = "Default"
let BASE_URL = "https://api.qa.saia.ai"
let API_TOKEN = "default_CIPIePI9FayEA9PEF24U-z-Hm3L_tDi_vzOKjdgi9RGhnJbBvlCCcEP26nhj5Lw5X-zD8b8dDQwGQa_P_kDDtKfvhPfTXQZ_nBDlMAdXxyqsEdZQFbZ-c0w0DijuCcZWowMwHa2-4vRK6utOuMQVvaMb52Vw_BNCdkS3glYPyK4="

const prompt = 
`
You are an assistant designed to answer questions about the GeneXus documentation. Read the question first and then look for the answer in the GeneXus documentation. 

If you don’t know the answer, just say you don’t know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:

`


const mode = "beta" 

if (mode === "qa"){
    // no hacemos nada porque los default values ya son de qa
}
else if (mode === "beta"){
    PROFILE = "Default"
    BASE_URL = "https://api.beta.saia.ai"
    API_TOKEN = "default_axC_JEPqdNAP5vWotjIOViiWl9lqGNyBMUlIpfmEKielkdQ7XXnTRvSl-Ysm8zYRCHUG5ubi_7caqHhKun3EpNEfxjw1MzRsuYhVACwdtEOuestWWxBOKV1zd8ckeZ-5ofCmZiVJonCNEiE3QvFt34eW1IGFiRg9glmn2MyRyBE="
}

const PUT_URL = `${BASE_URL}/v1/search/profile/${PROFILE}`
const EXECUTE_URL = `${BASE_URL}/v1/search/execute`
const GET_URL = `${BASE_URL}/v1/search/profile/${PROFILE}`

const HEADERS = {
    "Authorization": `Bearer ${API_TOKEN}`,
    "Accept": "application/json",
    "Content-Type": "application/json" 
}

// DO NOT FORGET TO PUT THIS IN THE .ENV

const PUT_SEARCH_PROFILE =
{
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
    }
  }

  // Hace la combinación que actualizar el perfíl con los ajustes elegidos y hacer la pregunta
export async function saiaRequest(query) {
    return new Promise((resolve, reject) => {
        updateProfile(query).then(x => {
            if (x !== "success"){
                console.log(x)
                resolve({
                    text: "error updating profile",
                    articles: ""  
                })
            }
            executeQuery(query).then(chatResponse => {
                resolve(chatResponse)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })

    });
}

export function updateProfile(query){
    const updateProfileBody = getUpdateProfileBody(query)
    // hacer el request a SAIA usando el URL, profileName y updatedProfileObj
    // retorna como promesa

    return fetch(PUT_URL, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(updateProfileBody)
    })
    .then(response => {
        if (!response.ok){
            return response.json()
        }
        return "success"
    })
}

function executeQuery(query){
    const executeQueryObj = {
        profile: PROFILE,
        question: query.Question
    }

    let chatResponse = {
        text: "",
        articles: ""
    }

    return fetch(EXECUTE_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(executeQueryObj)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                console.log(`HTTP error! Status: ${response.status}, Message: ${text}`);
                console.log(JSON.parse(text))
                return JSON.parse(text)
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.error) { // el código es muy sucio porque no hay consistencia en el tipo de objeto recibido del api
            if (data.result.messages) {
                chatResponse.text = data.result.messages[0];
            } else if(data.error.message){
                chatResponse.text = data.error.message;
            }
            else {
                chatResponse.text = data;
            }
        } else {
            chatResponse.text = data.text;
            chatResponse.articles = getArticles(data.documents);
        }
        return chatResponse;
    })
    .catch(error => {
        console.error("Error en executeQuery:", error.message);
        throw error;
    });
    
}

function getArticles(documents){
    let output = ""

    for (const document of documents){
        output += 
        `${document.pageContent.slice(0,100)}

        ${document.metadata.source}

        ##################################
        
        `
    }
    return output
}

export function getProfile(){
    return fetch(GET_URL, {  // <-- Añadir el retorno aquí
        method: "GET",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "accept": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error al obtener el perfil:", error);
        throw error;  // Si quieres que el error sea manejado afuera, propágalo
    });
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
              "prompt": prompt
            },
            "retriever": {
              "type": query["Retriever Type"], /* vectorStore, selfQuery, hyde, contextualCompression */
            "prompt": `
                Please answer the question in the context of GeneXus.
                Question: {question}
                Answer:`
            }        
          }
    }


}



