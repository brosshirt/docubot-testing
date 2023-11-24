import { testingSets } from "./testingSets"


const questionOptions = Object.keys(testingSets)
const promptOptions = ["normal", "inverse"]
const kOptions = [7,10,13,20]
const modelOptions = [/*'gpt-4', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-1106',*/ 'gpt-4-1106-preview']


export const defaultQuerySettings = [
    { name: 'Question', isIV: false, options: questionOptions, selectedOption: questionOptions[0], textResponse: ''},
    { name: 'PromptType', isIV: false, options: promptOptions, selectedOption: promptOptions[0], textResponse: ''},
    { name: 'k', isIV: false, options: kOptions, selectedOption: kOptions[0], textResponse: ''},
    // { name: 'Retriever Type', isIV: false, options: ["vectorStore", "hyde"], selectedOption: 'vectorStore', textResponse: ''},
    { name: 'Model', isIV: false, options: modelOptions, selectedOption: modelOptions[0], textResponse: ''},
]