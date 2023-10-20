import React from 'react';
import QueryReportBox from '../QueryReportCell/QueryReportCell';
import './QueryReportRow.css';

function QueryReportRow({ data }) {
    const individualProperties = Object.entries(data).map(([key, value]) => { // tipo [{k:2}, {Model: 3.5}...]
        return { [key]: value };
    });
    
    return (
        <div className="queryReportRow">
            {individualProperties.map((item, index) => (
                <QueryReportBox key={index} item={item} />
            ))}
        </div>
    );
}

export default QueryReportRow;
