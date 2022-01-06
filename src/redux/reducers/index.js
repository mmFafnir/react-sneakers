

import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import basketReducer from "./basket";
import favoritesReducer from "./favorites";
import ordersReducer from "./order";
import sneakersReducer from "./sneakers";





export const history = createBrowserHistory()

const initial = {

};


export function appReducer(state = initial, action) {
    return state
}

export const rootReducer = combineReducers ({
    app: appReducer,
    sneakers: sneakersReducer,
    favorites: favoritesReducer,
    basket: basketReducer,
    orders: ordersReducer,
    router: connectRouter(history)
})

export default rootReducer;