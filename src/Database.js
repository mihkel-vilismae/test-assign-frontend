const getApiUrl = () => {
    return "http://127.0.0.1:8000/api";
    //return "http://localhost:8001/api";
    //return "http:/127.0.0.1:8000/api";
    //return "http://127.0.0.1:8001/api";
};

export const CREATE = getApiUrl() + "/create";
export const DELETE = getApiUrl() + "/delete";
export const GET = getApiUrl() + "/filters";
export const UPDATE = getApiUrl() + "/update";
export const GET_FILTER = getApiUrl() + "/filter/";
