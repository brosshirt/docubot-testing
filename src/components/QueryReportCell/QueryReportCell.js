import React from 'react';
import { stringToHtml } from '../../lib/generalLib';
import './QueryReportCell.css';

function QueryReportCell({ label, value }) {    
    
    
    const htmlValue = stringToHtml(value)
    
    return (
        <div className="queryReportCell">
            <span className="name">{label}</span>
            <p className="value" title={value} dangerouslySetInnerHTML={{ __html: htmlValue }} />
        </div>
    );
}

export default QueryReportCell;
