
import { routerMiddleware } from "connected-react-router"
import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import reducer, { history } from "./reducers"
import rootSaga from "./saga"


const sagaMiddleware = createSagaMiddleware()


const store = createStore(
    
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
);
sagaMiddleware.run(rootSaga)


export default store