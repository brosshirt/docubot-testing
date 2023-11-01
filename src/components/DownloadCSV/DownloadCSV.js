import React from 'react';
import './DownloadCSV.css';
import { downloadCSV } from '../../lib/generalLib';

function DownloadCSV({outputGraph}) {
  
    // Downloads the outputGraph as a csv
    const handleDownload = () => {
        downloadCSV(outputGraph, "saiaResults.csv")
    };

  return <button onClick={handleDownload} className='button-csv'>Download CSV</button>;
}

export default DownloadCSV;
