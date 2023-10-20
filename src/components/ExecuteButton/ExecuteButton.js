import React from 'react';
import './ExecuteButton.css';

const ExecuteButton = ({ onClick, disabled, execDisable}) => {
    return (
        <div className="input-var-box">
            <button className="executeButton" onClick={onClick} disabled={execDisable}>
                Execute
            </button>
        </div>
        
    );
};

export default ExecuteButton;
