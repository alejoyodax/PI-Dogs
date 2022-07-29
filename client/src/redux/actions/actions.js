import axios from "axios"

import {
    GET_ALL_DOG_BREEDS,
    NOT_SUCCESFUL_RESPONSE,
    RESET_FILTER,
    GET_ALL_TEMPERAMENTS,
    FILTER_DOG_BREEDS,
    ORDER_DOG_BREEDS,

} from "./actions_names"

const BASE_URL = process.env.REACT_APP_API_URL;
const URL_GET_ALL_DOG_BREEDS = process.env.NODE_ENV === "production" ?
    BASE_URL + "/api/dogs/" : "http://localhost:3001/api/dogs/"

console.log("ENTORNO -->:", process.env.NODE_ENV)

export function getAllDogBreeds() {
    // console.log("ACTION: getAllBreeds ejecutada...")
    return function (dispatch) {
        return axios(URL_GET_ALL_DOG_BREEDS)
            .then(json => {
                dispatch({ type: GET_ALL_DOG_BREEDS, payload: json.data })
            })
            .catch((error) => {
                // console.log(error)
                dispatch({ type: NOT_SUCCESFUL_RESPONSE })
            })
    }
}

const URL_GET_ALL_DOG_TEMPERAMENTS = process.env.NODE_ENV === "production" ?
    BASE_URL + "/api/tempers/" : "http://localhost:3001/api/tempers/"

export function getAllDogTemperaments() {
    // console.log("ACTION: getAllBreeds ejecutada...")
    return function (dispatch) {
        return axios(URL_GET_ALL_DOG_TEMPERAMENTS)
            .then(json => {
                dispatch({ type: GET_ALL_TEMPERAMENTS, payload: json.data })
            })
            .catch((error) => {
                // console.log(error)
                dispatch({ type: NOT_SUCCESFUL_RESPONSE })
            })
    }
}


export function resetFilter() {
    return {
        type: RESET_FILTER
    }
}

export function filterDogBreeds(filters) {
    return {
        type: FILTER_DOG_BREEDS,
        payload: filters
    }
}

export function orderDogBreeds(order) {
    return {
        type: ORDER_DOG_BREEDS,
        payload: order
    }
}