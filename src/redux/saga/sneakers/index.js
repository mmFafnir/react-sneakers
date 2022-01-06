import { LOCATION_CHANGE } from "connected-react-router";
import { takeEvery, apply, take, put, call, fork } from "redux-saga/effects";
import { LOAD_SNEAKERS, LOAD_SNEAKERS__FAILURE, LOAD_SNEAKERS__SUCCESS } from "../../reducers/sneakers/actions";





export function* loadSneakersList({payload}) {
    try {
        const request = yield call(fetch, `https://6127d405c2e8920017bc0ed4.mockapi.io/${payload}`);
        const data = yield apply(request, request.json);
        yield  put({
            type: LOAD_SNEAKERS__SUCCESS,
            payload: data
        })
    } catch(error){
        yield  put({
            type: LOAD_SNEAKERS__FAILURE,
            payload: 'Произошла ошибка, перезагрузите страницу'
        })
    }
}
 

export function* loadSneakersOnRouterEnter() {
    while(true) {
         const action = yield take(LOCATION_CHANGE);
        if(action.payload.location.pathname === '/'){
            yield put({
                type: LOAD_SNEAKERS,
                payload: 'items'
            })
        }
    }
}



export default function* loadSneakersSaga() {
    yield fork(loadSneakersOnRouterEnter)
    yield takeEvery(LOAD_SNEAKERS, loadSneakersList)
}