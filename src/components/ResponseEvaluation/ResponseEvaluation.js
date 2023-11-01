import React, { useState, useEffect } from 'react';
import './ResponseEvaluation.css';
import { evaluateResponses } from '../../lib/responseEvalLib';
import { convertToCSV, downloadCSV, parseCSV } from '../../lib/generalLib';


function ResponseEvaluation({outputGraph, setOutputGraph}) {
  
    const [isLoading, setIsLoading] = useState(false);

    // Puedes agregar las funciones que quieras llamar cuando hagan click en los botones
    async function evalCSV(event) {
        setIsLoading(true);
        try {
            const unevaluatedResponses = await parseCSV(event.target.files[0]);

            const evaluatedResponses = await evaluateResponses(unevaluatedResponses)

            downloadCSV(evaluatedResponses, "saiaResultsAndEval.csv")
        } catch (error) {
            console.error('Error evaluating csv:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function evalGraph() {
        setIsLoading(true);
        try {
            console.log('hello')

            const evaluatedResponses = await evaluateResponses(outputGraph)

            console.log('responsesEvaluated')

            setOutputGraph(evaluatedResponses)

        } catch (error) {
            console.error('Error evaluating output graph:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='button-container'>
            <input 
                type="file"
                id="fileInput"
                onChange={evalCSV}
                style={{ display: 'none' }} 
                disabled={isLoading}
            />
            <label htmlFor="fileInput" className='eval csv'>Eval csv</label>
            <button onClick={evalGraph} className='eval graph' disabled={isLoading}>Eval graph</button>
        </div>
    );
}

export default ResponseEvaluation;



