export const getCreateUrl = () => {
    return CREATE;
}

export const getFiltersUrl = () => {
    return GET;
}

export const getDeleteUrl = (filterId) => {
    return DELETE+filterId;
}

export const getUpdateUrl = (filterId) => {
    return UPDATE+filterId;
}
const getApiUrl = () => {
    return "http://127.0.0.1:8000/api";
    //return "http://localhost:8001/api";
    //return "http:/127.0.0.1:8000/api";
    //return "http://127.0.0.1:8001/api";
};

const GET = getApiUrl() + "/filters/get";
const CREATE = getApiUrl() + "/filters/create";
const UPDATE = getApiUrl() + "/filters/update/";
const DELETE = getApiUrl() + "/filters/delete/";



