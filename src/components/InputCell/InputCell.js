import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import './InputCell.css';

function InputCell({InputCellState, setInputCellState, IVs, setIVs, MAX_IV}) {
    
    const [localState, setLocalState] = useState(InputCellState)

    useEffect(() => {
        // cambiamos inputBoxState 
        setInputCellState(localState) // confuso, pero setInputCellState no es una verdadera state function. Solo existe para ejecutar código escrito en inputBox
    }, [localState])


    const disableDropdown = () => {
        if (localState.name === "Question"){
            return false;
        }
        return localState.isChecked
    }

    const updateIV = (e) => { // hay que mantener la lista de IVs seleccionados
        if (e.target.checked){
            if (IVs === MAX_IV){
                e.target.checked = false
                return;
            }
            setIVs(IVs + 1)
        }
        else{
            setIVs(IVs - 1)
        }
        setLocalState(prevState => ({ ...prevState, isChecked: e.target.checked }))
    }


    if (localState.name === "Question" && localState.isChecked === false){
        return (
            <Question localState={localState} setLocalState={setLocalState} updateIV={updateIV}/>
        )
    }



    return (
    <div className="input-var-box">
        <span className="input-var-name">{InputCellState.name}</span>
        <label className="input-var-checkbox-label">
            IV:
            <input 
                type="checkbox" 
                checked={InputCellState.isChecked} 
                onChange={(e) => updateIV(e)}
            />
        </label>
        <select 
            className="dropdown"
            value={InputCellState.option}
            onChange={(e) => setLocalState(prevState => ({... prevState, option: e.target.value}))}
            disabled={disableDropdown()}
        >
            {InputCellState.options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
  );
}

export default InputCell;
