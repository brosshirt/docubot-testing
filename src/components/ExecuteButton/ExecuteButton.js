import React from 'react';
import './ExecuteButton.css';

const ExecuteButton = ({ execute, execDisable}) => {
    return (
        <div className="input-var-box">
            <button className="executeButton" onClick={execute} disabled={execDisable}>
                Execute
            </button>
        </div>
        
    );
};

export default ExecuteButton;
