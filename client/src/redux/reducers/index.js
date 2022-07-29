// REDUCERS
import filterDogBreeds from '../helpers/filterDogBreeds.js'
import orderDogBreeds from '../helpers/orderDogBreeds.js'

import {
   GET_ALL_DOG_BREEDS,
   NOT_SUCCESFUL_RESPONSE,
   GET_ALL_TEMPERAMENTS,
   FILTER_DOG_BREEDS,
   ORDER_DOG_BREEDS,
} from '../actions/actions_names.js'

// STORE Y SUS VARIABLES
const initialState = {
   dogBreeds: [],   // LOS POKEMONES QUE LLEGAN DE LA API
   dogBreedsToShow: [],
   temperaments: [],
   isLoading: true,
   isSuccesRequest: true
}


export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ALL_DOG_BREEDS:
         return {
            ...state,
            dogBreeds: [...action.payload],
            dogBreedsToShow: [...action.payload],
            isLoading: false,
            isSuccesRequest: true
         }
      case GET_ALL_TEMPERAMENTS:
         return {
            ...state,
            temperaments: [...action.payload]
         }

      case FILTER_DOG_BREEDS:
         // console.log("ACTION FILTER: ", action.payload)
         const filters = action.payload // FILTERS ES UN OBJETO
         const filteredDogs = filterDogBreeds({
            source: filters.source,
            temp: filters.temp,
            dogBreeds: [...state.dogBreeds]   //PASAMOS TODOS LOS DOGS PARA FILTRARLOS
         })
         return {
            ...state,
            dogBreedsToShow: [...filteredDogs]
         }

      case ORDER_DOG_BREEDS:
         const order = action.payload;
         const orderedDogs = orderDogBreeds({
            dogBreeds: [...state.dogBreedsToShow],
            order,
         })
         return {
            ...state,
            dogBreedsToShow: [...orderedDogs]
         }

      // SIEMPRE PONER CASO DEFAULT, O SI NO NINGUN COMPONENTE PUEDE ACCEDER AL ESTADO
      default:
         return state;
   }


}