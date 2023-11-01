import QuerySettings from './components/QuerySettings/QuerySettings';
import QueryReport from './components/QueryReport/QueryReport';
import { getQueriesList, runQueryProcess } from './lib/queryLib.js';
import DownloadCSV from './components/DownloadCSV/DownloadCSV'
import ResponseEvaluation from './components/ResponseEvaluation/ResponseEvaluation'
import { defaultQuerySettings } from './hardCoded/defaultQuerySettings';
import React, { useState } from 'react';
import './App.css';

function App() {

  const [execDisable, setExecDisable] = useState(false);

  // this is the object that contains everything that is displayed in the graph (the chatGPT responses)
  const [outputGraph, setOutputGraph] = useState([])

  // contains all of the information needed to execute the queries (k: 3, model: all etc)
  const [querySettingsState, setQuerySettingsState] = useState(defaultQuerySettings);

  async function execute(){ 

    setExecDisable(true)
    setOutputGraph([])
    
    // Get all of the individual queries based on the settings inputted
    const queries = getQueriesList(querySettingsState)

    runQueryProcess(queries, setOutputGraph)
    .then(v => { 
      setExecDisable(false)
    })
  }

  return (
    <div className="App">
      {/* <ResponseEvaluation/> */}
      <DownloadCSV outputGraph={outputGraph}/>
      <ResponseEvaluation outputGraph={outputGraph} setOutputGraph={setOutputGraph}/>
      <QuerySettings querySettingsState={querySettingsState} setQuerySettingsState={setQuerySettingsState} execute={execute} execDisable={execDisable}/> 
      <QueryReport outputGraph={outputGraph}/>
    </div>
  );
}

export default App;
