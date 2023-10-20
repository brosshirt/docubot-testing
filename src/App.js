import InputBox from './components/InputBox/InputBox';
import QueryReport from './components/QueryReport/QueryReport';
import { everyCombo, executeQueries, getOptions } from './lib/basicLib';
import { testingSets } from './lib/testingSets'; 
import React, { useState } from 'react';
import './App.css';

function App() {

  const [execDisable, setExecDisable] = useState(false);

  const [outputGraph, setOutputGraph] = useState([])

  const [inputBoxState, setInputBoxState] = useState([
    { name: 'Question', isChecked: false, options: Object.keys(testingSets), option: "n=5", textResponse: ''},
    { name: 'k', isChecked: false, options: [3,5,7,9], option: 3, textResponse: ''},
    { name: 'Retriever Type', isChecked: false, options: ["vectorStore", "hyde"], option: 'vectorStore', textResponse: ''},
    { name: 'Model', isChecked: false, options: ['gpt-4', 'gpt-3.5-turbo-16k'], option: 'gpt-3.5-turbo-16k', textResponse: ''},
  ]);

  async function execute(){ 

    setExecDisable(true)
  
    if (outputGraph.length !== 0){
      setOutputGraph([])
    }
    
    let options = getOptions(inputBoxState) // esas son todas las permutaciones disponibles para cada input
    let queries = everyCombo(options) // toda la información que necesitamos para hacer un query, estamos para pasar al API
  

    executeQueries(queries, setOutputGraph)
    .then(v => { //eso es para la version synchronous
      setExecDisable(false)
    })

    

  }

  return (
    <div className="App">
      <InputBox inputBoxState={inputBoxState} setInputBoxState={setInputBoxState} executeQuery={execute} execDisable={execDisable}/> 
      <QueryReport outputGraph={outputGraph}/>
    </div>
  );
}

export default App;
