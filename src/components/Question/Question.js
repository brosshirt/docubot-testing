import React from 'react';
import './Question.css';

function Question({querySettingState, setQuerySettingState}) {
    
    
    return (
        <div className="questionBox">
            <div className="header">
                <label>Question</label>
                <label>IV:</label>
                <input 
                    type="checkbox" 
                    checked={querySettingState.isIV} 
                    onChange={(e) => setQuerySettingState(prevState => ({...prevState, isIV: e.target.value}))}
                />
                
            </div>
            <textarea 
                className="textBlock" 
                placeholder="Write your question here..."
                value={querySettingState.textResponse}
                onChange={(e) => setQuerySettingState(prevState => ({...prevState, textResponse: e.target.value}))}
            ></textarea>

        </div>
    );
}

export default Question;
