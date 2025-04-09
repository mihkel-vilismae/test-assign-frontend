// Database.js
const getApiUrl = () => {
    return "http://localhost:8001/api";
    //return "http://127.0.0.1:8001/api";
};

export const CREATE = getApiUrl() + "/create";
export const DELETE = getApiUrl() + "/delete";
export const GET = getApiUrl() + "/filters";
export const UPDATE = getApiUrl() + "/update";

export const GET_FILTER = getApiUrl() + "/filter/";



export const alertLog = (text, level = 0) => {
    return;
    let count = 0;
    if (level === 3) {
        count++;
        alert(count + " --- " + text);
        console.debug(count + " --- " + text);
    }
    if (level === 1) {
        console.debug(text);
    } else if (level === 2) {
        count++;
        console.debug(count + " --- " + text);
    } else
        console.log(text);
}

export const  getInputValuesAsString = () => {
    const container = document.getElementById('new-filter-form');
    if (!container) return '';

    const inputs = container.querySelectorAll('input');
    const values = Array.from(inputs).map(input => input.value);
    let resultString = values.join(',');
    console.log("getInputValuesAsString: ", resultString);
    return resultString; // Join values with a comma or any other delimiter
}

export const  fillFormWithValues = () => {
    /*const container = document.getElementById('mess');
    if (!container) return;

    const inputs = container.querySelectorAll('input');
    const values = valuesString.split(','); // Split the string using the same delimiter

    values.forEach((value, index) => {
        if (inputs[index]) {
            inputs[index].value = value;
        }
    });*/
 //   console.log('Filled form with values:', values);
}