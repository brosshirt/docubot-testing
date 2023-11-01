
import { testingSets } from '../hardCoded/testingSets';
import Papa from 'papaparse'; 

export const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: function(result) {
                resolve(result.data);
            },
            header: true,
            error: function(error) {
                reject(error);
            }
        });
    });
}

export function findLastJsonInString(s) {
    let startIdx = s.lastIndexOf("{");
    let endIdx = s.lastIndexOf("}");

    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
        let jsonStr = s.substring(startIdx, endIdx + 1);
        jsonStr = jsonStr.replace(/“/g, "\"").replace(/”/g, "\""); // Reemplazar comillas curvas con comillas rectas

        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error("Error al intentar parsear el JSON:", e);
        }
    }
    return null;
}



export const downloadCSV = (objectList, fileName) => {
    let csvData = convertToCSV(objectList)
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}



export const combineItemWithList = (item, list) => {
    return list.map(listItem => ({
        ...item,
        ...listItem
    }));
}

export function everyCombo(list){
    if (list.length === 1){
        return list[0];
    }
    let allCombos = [];
    let everyComboRestOfList = everyCombo(list.slice(1));
    for (let item of list[0]){ 
        allCombos.push(...combineItemWithList(item, everyComboRestOfList));
    }
    return allCombos;
}

export function stringToHtml(str) {
    if (typeof str !== 'string') {
        return str;
    }

    if (str.includes('  Print')){
        console.log("Incluye tab")
    }

    const replacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        '\n': '<br />',
        '\t': '&emsp;',
        '  ': '&emsp;' 
    };

    return str.replace(/[&<>"'\n\t]|  /g, match => replacements[match]);
}





// extremely abstract function that is used in converting the querySettings into the the list of queries
export function getOptions(querySettingsState) {
    let options = [];

    for (let item of querySettingsState) {
        if (item.name === "Question") {
            if (item.isIV) {
                options.push(createObjectList(item.name, testingSets[item.selectedOption]));
            }
            else {
                options.push(createObjectList(item.name, [item.textResponse]));
            }
        }
        else {
            if (item.isIV) {
                options.push(createObjectList(item.name, item.options));
            }
            else {
                options.push(createObjectList(item.name, [item.selectedOption]));
            }
        }
    }
    return options;
}


export function createObjectList(key, values) {
    return values.map(value => ({ [key]: value }));
}
// only examines the properties that are in data[0]
export function convertToCSV(data) {
    const separator = ","
    
    if (data.length === 0) return '';

    // Encabezados
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Agregamos los encabezados al CSV
    csvRows.push(headers.join(separator));

    // Agregamos los datos
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '""'); // Escapamos cualquier comilla doble
            return `"${escaped}"`; // Encerramos cada valor entre comillas dobles
        });
        csvRows.push(values.join(separator));
    }

    return csvRows.join('\n');
}


function sortObjectsByProperties(a, b) {
    const keys = Object.keys(a);

    for (let key of keys) {
        if (typeof a[key] === "string" && typeof b[key] === "string") {
            const comparison = a[key].localeCompare(b[key]);
            if (comparison !== 0) {
                return comparison;
            }
        } else if (typeof a[key] === "number" && typeof b[key] === "number") {
            const comparison = a[key] - b[key];
            if (comparison !== 0) {
                return comparison;
            }
        } // Puedes agregar más condiciones para otros tipos de datos si es necesario.
    }

    return 0; // Si llegamos a este punto, los objetos son idénticos en base a las propiedades listadas.
}
