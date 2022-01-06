
import store from "../..";
import { setStorage } from "../../../hooks/storage";
import { ADD_BASKET, ADD_BASKET__FAILURE, ADD_BASKET__SUCCESS, DELETE_ALL_BASKET, DELETE_ALL_BASKET__FAILURE, DELETE_ALL_BASKET__SUCCESS, LOAD_BASKET, LOAD_BASKET__FAILURE, LOAD_BASKET__SUCCESS, REMOVE_BASKET, REMOVE_BASKET__FAILURE, REMOVE_BASKET__SUCCESS } from "./actions";



const initialBasketState = {
    loading: false,
    error: null, 
    data: []
}


export default function basketReducer(state = initialBasketState, action) {
    switch (action.type) {
        case LOAD_BASKET: {
            return {
                ...state,
                loading: true
            };
        }
        case LOAD_BASKET__SUCCESS: {
            
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        }
        case LOAD_BASKET__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }


        case ADD_BASKET: {
            return {
                ...state,
                loading: true,
            };
        }
        case ADD_BASKET__SUCCESS: {
            setStorage('basket', [...state.data, action.payload])
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
               
            }
        }
        case ADD_BASKET__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        

        case REMOVE_BASKET: {
            return {
                ...state,
                loading: true,
            }
        }
        case REMOVE_BASKET__SUCCESS: {
            setStorage('basket', state.data.filter(item => item.parenId !== action.payload))
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item.parenId !== action.payload)
            }
        }
        case REMOVE_BASKET__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }


        case DELETE_ALL_BASKET: {
            return {
                ...state,
                loading: true,
                
            }
        }
        case DELETE_ALL_BASKET__SUCCESS: {
            setStorage('basket', [])
            console.log(2);
            return {
                ...state,
                loading: false,
                data: []
            }
        }
        case DELETE_ALL_BASKET__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        

        default:
            return state
    }
}


