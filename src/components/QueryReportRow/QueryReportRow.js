import React from 'react';
import QueryReportCell from '../QueryReportCell/QueryReportCell';
import './QueryReportRow.css';

function QueryReportRow({ data }) {    
    
    return (
        <div className="queryReportRow">
            {Object.entries(data).map(([key, value], index) => ( // for every key, value in the object
                <QueryReportCell key={index} label={key} value={value} />
            ))}
        </div>
    );
}

export default QueryReportRow;

