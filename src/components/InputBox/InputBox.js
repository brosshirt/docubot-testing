import React, { useEffect, useState } from 'react'
import './InputBox.css';
import InputCell from '../InputCell/InputCell';
import ExecuteButton from '../ExecuteButton/ExecuteButton';

function InputBox({ inputBoxState, setInputBoxState, executeQuery, execDisable}) {
    
    const MAX_IV = 4 // The max number of independent variables
    
    const [IVs, setIVs] = useState(0);
    
    return (
        <div className="inputBox">
            {inputBoxState.map((InputCellState , index) => (
                <InputCell 
                    key={index} 
                    InputCellState ={InputCellState} 
                    setInputCellState ={(updatedData) => {
                        const newState = [...inputBoxState];
                        newState[index] = updatedData;
                        setInputBoxState(newState);
                    }}
                    IVs={IVs}
                    setIVs={setIVs}  
                    MAX_IV={MAX_IV}              
                />
            ))}
            <ExecuteButton onClick={executeQuery} disabled={false} execDisable={execDisable}/>
        </div>
    );
}

export default InputBox;
