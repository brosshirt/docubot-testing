import React from 'react';
import './QueryReport.css';
import DownloadCSVButton from '../DownloadCSV/DownloadCSV';
import QueryReportRow from '../QueryReportRow/QueryReportRow';

const QueryReport = ({ outputGraph }) => {
    return (
        <div className="queryReport">
            <DownloadCSVButton outputGraph={outputGraph}/>
            {outputGraph.map((data, index) => (
                <QueryReportRow key={index} data={data} />
            ))}
        </div>
    );
};

export default QueryReport;
