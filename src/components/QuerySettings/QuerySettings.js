import React, { useEffect, useState } from 'react'
import './QuerySettings.css';
import QuerySetting from '../QuerySetting/QuerySetting';
import ExecuteButton from '../ExecuteButton/ExecuteButton';

function QuerySettings({ querySettingsState, setQuerySettingsState, execute, execDisable}) {
    
    // When a QuerySetting is updated, the entire state object is updated accordingly (lifting state up)
    function updateQuerySettings(index, updatedData) {
        const newState = [...querySettingsState];
        newState[index] = updatedData;
        setQuerySettingsState(newState);
    }
    
    return (
        <div className="querySettings">
            {querySettingsState.map((querySettingData , index) => (
                <QuerySetting 
                    key={index} 
                    querySettingData={querySettingData} 
                    updateQuerySettings={(updatedData) => updateQuerySettings(index, updatedData)}          
                />
            ))}
            <ExecuteButton execute={execute} execDisable={execDisable}/>
        </div>
    );
}

export default QuerySettings;
