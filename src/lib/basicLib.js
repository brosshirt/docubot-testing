
import { testingSets } from './testingSets';
import { saiaRequest, executeQuery } from './saiaApi';


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

export async function executeQueries(queries, setOutputGraph){
    for (const query of queries){
        const startTime = Date.now();
        const chatResponse = await saiaRequest(query)
        const endTime = Date.now();
        const elapsedSeconds = (endTime - startTime) / 1000;
        let outputRow = {
            ...query,
            Response: chatResponse.text,
            Articles: chatResponse.articles,
            Duration: elapsedSeconds
        }
        setOutputGraph(prevOutputGraph => [...prevOutputGraph, outputRow]);
    }
    console.log("all of the queries have completed")
}

// old, es mejor pero el api no anda muy bien con asynchronous calls
// export function executeQueries(queries, setOutputGraph){
//     const promises = queries.map(query => {
//         return saiaRequest(query).then(chatResponse => {
//             let outputRow = {
//                 ...query,
//                 Response: chatResponse.text,
//                 Articles: chatResponse.Articles
//             }
//             setOutputGraph(prevOutputGraph => [...prevOutputGraph, outputRow]);
//         });
//     });

//     Promise.all(promises).then(resolvedQueries => { // Ordenar el output cuando todos estén 
//         setOutputGraph(prevOutputGraph => {
//             prevOutputGraph.sort(sortObjectsByProperties);
//             return prevOutputGraph;
//         });
//     })
// }

export function getOptions(inputBoxState) {
    let options = [];

    for (let item of inputBoxState) {
        if (item.name === "Question") {
            if (item.isChecked) {
                options.push(createObjectList(item.name, testingSets[item.option]));
            }
            else {
                options.push(createObjectList(item.name, [item.textResponse]));
            }
        }
        else {
            if (item.isChecked) {
                options.push(createObjectList(item.name, item.options));
            }
            else {
                options.push(createObjectList(item.name, [item.option]));
            }
        }
    }
    return options;
}


export function createObjectList(key, values) {
    return values.map(value => ({ [key]: value }));
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

export function convertToPseudoCSV(data) {
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
