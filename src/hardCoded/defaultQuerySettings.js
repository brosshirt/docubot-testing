import { testingSets } from "./testingSets"

export const defaultQuerySettings = [
    { name: 'Question', isIV: false, options: Object.keys(testingSets), selectedOption: "n=5", textResponse: ''},
    { name: 'PromptType', isIV: false, options: ["normal", "inverse"], selectedOption: "normal", textResponse: ''},
    { name: 'k', isIV: false, options: [3,5,6,7,9], selectedOption: 3, textResponse: ''},
    { name: 'Retriever Type', isIV: false, options: ["vectorStore", "hyde"], selectedOption: 'vectorStore', textResponse: ''},
    { name: 'Model', isIV: false, options: ['gpt-4', 'gpt-3.5-turbo-16k'], selectedOption: 'gpt-3.5-turbo-16k', textResponse: ''},
]