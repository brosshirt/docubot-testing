import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import './QuerySetting.css';

function QuerySetting({querySettingData, updateQuerySettings}) {
    
    const [querySettingState, setQuerySettingState] = useState(querySettingData)

    // when the querySetting is changed, we move these changes up to the querySettings with updateQuerySettings
    useEffect(() => {
        updateQuerySettings(querySettingState) 
    }, [querySettingState])

    // If you want to insert a question then we render an entirely different object, very ugly solution 
    if (querySettingState.name === "Question" && querySettingState.isIV === false){
        return (
            <Question querySettingState={querySettingState} setQuerySettingState={setQuerySettingState}/>
        )
    }

    return (
    <div className="querySetting">
        <span className="input-var-name">{querySettingState.name}</span>
        <label className="input-var-checkbox-label">
            IV:
            <input 
                type="checkbox" 
                checked={querySettingState.isIV} 
                onChange={(e) => setQuerySettingState(prevState => ({ ...prevState, isIV: e.target.checked }))}
            />
        </label>
        <select 
            className="dropdown"
            value={querySettingState.selectedOption}
            onChange={(e) => setQuerySettingState(prevState => ({... prevState, selectedOption: e.target.value}))}
            disabled={querySettingState.isIV && querySettingState.name !== "Question"}
        >
            {querySettingState.options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
  );
}

export default QuerySetting;
