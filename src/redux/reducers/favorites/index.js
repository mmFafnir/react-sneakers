import store from "../..";
import { setStorage } from "../../../hooks/storage";
import { LOAD_FAVORITES, LOAD_FAVORITES__SUCCESS, LOAD_FAVORITES__FAILURE, ADD_FAVORITES, ADD_FAVORITES__SUCCESS, ADD_FAVORITES__FAILURE, REMOVE_FAVORITES, REMOVE_FAVORITES__SUCCESS  } from "./actions";



const initialFavoritesState = {
    loading: false,
    error: null, 
    data: []
}


export default function favoritesReducer(state = initialFavoritesState, action) {
    switch (action.type) {
        
        case LOAD_FAVORITES: {
            return {
                ...state,
                loading: true
            };
        }

        case LOAD_FAVORITES__SUCCESS: {
            
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        }

        case LOAD_FAVORITES__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        
        case ADD_FAVORITES: {
            return {
                ...state,
                loading: true,
            };
        }
        
        case ADD_FAVORITES__SUCCESS: {
            setStorage('favorites', [...state.data, action.payload])
            
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
               
            }
        }
        case ADD_FAVORITES__FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        
        case REMOVE_FAVORITES: {
            return {
                ...state,
                loading: true,
            }
        }

        case REMOVE_FAVORITES__SUCCESS: {
            setStorage('favorites', state.data.filter(fav => fav.parenId !== action.payload))
            return {
                ...state,
                loading: false,
                data: state.data.filter(fav => fav.parenId !== action.payload)
            }
        }       

        default:
            return state
    }
}