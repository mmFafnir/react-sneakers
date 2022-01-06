import { LOAD_SNEAKERS, LOAD_SNEAKERS__SUCCESS, LOAD_SNEAKERS__FAILURE } from "./actions";



const initialSneakersState = {
    loading: false,
    error: null, 
    data: []
}


export default function sneakersReducer(state = initialSneakersState, action) {
    switch (action.type) {
        case LOAD_SNEAKERS: {
            return {
                ...state,
                loading: true
            };
        }
        case LOAD_SNEAKERS__SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        }
        case LOAD_SNEAKERS__FAILURE: {
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