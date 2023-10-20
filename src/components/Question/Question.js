import React from 'react';
import './Question.css';

function Question({localState, setLocalState, updateIV}) {
    
    const handleTextChange = (e) => {
        setLocalState(prevState => ({
            ...prevState,
            textResponse: e.target.value
        }));
    };
    
    return (
        <div className="questionBox">
            <div className="header">
                <label>Question</label>
                <label>IV:</label>
                <input 
                    type="checkbox" 
                    checked={localState.isChecked} 
                    onChange={(e) => updateIV(e)}
                />
                
            </div>
            <textarea 
                className="textBlock" 
                placeholder="Write your question here..."
                value={localState.textResponse}
                onChange={handleTextChange}
            ></textarea>

        </div>
    );
}

export default Question;
