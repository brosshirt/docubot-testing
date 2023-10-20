import React from 'react';
import './QueryReportCell.css';

function QueryReportCell({ item }) {
    const key = Object.keys(item)[0];
    const value = item[key];
    
    return (
        <div className="queryReportCell">
            <span className="name">{key}</span>
            <p className="value" title={value}>{value}</p>
        </div>
    );
}


export default QueryReportCell;
