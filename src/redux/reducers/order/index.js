import store from "../..";
import { setStorage } from "../../../hooks/storage";
import { ADD_ORDER, ADD_ORDER__FAILURE, ADD_ORDER__SUCCESS, LOAD_ORDER, LOAD_ORDER__FAILURE, LOAD_ORDER__SUCCESS, REMOVE_ORDER, REMOVE_ORDER__FAILURE, REMOVE_ORDER__SUCCESS } from "./actions";



const initialOrderState = {
    loading: false,
    error: null, 
    data: []
}


export default function ordersReducer(state = initialOrderState, action) {
    switch (action.type) {
        
        case LOAD_ORDER: {
            return {
                ...state,
                loading: true
            };
        }
        case LOAD_ORDER__SUCCESS: {
            
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        }
        case LOAD_ORDER__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        
        case ADD_ORDER: {
            return {
                ...state,
                loading: true,
            };
        }
        
        case ADD_ORDER__SUCCESS: {
            setStorage('orders', [...state.data, action.payload])
            console.log(1);
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
               
            }
        }
        case ADD_ORDER__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        
        case REMOVE_ORDER: {
            return {
                ...state,
                loading: true,
            }
        }

        case REMOVE_ORDER__SUCCESS: {
            setStorage('orders', state.data.filter(item => item.id !== action.payload))
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item.id !== action.payload)
            }
        }
        case REMOVE_ORDER__FAILURE: {
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