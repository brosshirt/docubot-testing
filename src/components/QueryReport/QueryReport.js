import React from 'react';
import './QueryReport.css';
import QueryReportRow from '../QueryReportRow/QueryReportRow';

const QueryReport = ({ outputGraph }) => {
    
    return (
        <div className="queryReport">
            {outputGraph.map((data, index) => (
                <QueryReportRow key={index} data={data} />
            ))}
        </div>
    );
};

export default QueryReport;
