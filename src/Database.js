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