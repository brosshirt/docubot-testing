import React from 'react';
import './DownloadCSV.css';
import { convertToPseudoCSV } from '../../lib/basicLib';

function DownloadCSV({ outputGraph, fileName = 'data.csv' }) {
  
     

  
    const handleDownload = () => {
        let csvData = convertToPseudoCSV(outputGraph)
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'saiaResults';

        document.body.appendChild(a);
        a.click();


        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

  return <button onClick={handleDownload} className='button-csv'>Descargar CSV</button>;
}

export default DownloadCSV;
