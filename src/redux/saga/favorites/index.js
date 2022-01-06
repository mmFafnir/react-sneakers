import axios from "axios";
import { LOCATION_CHANGE } from "connected-react-router";
import { takeEvery, apply, take, put, call, fork, takeLatest } from "redux-saga/effects";
import { getStorage } from "../../../hooks/storage";
import { LOAD_FAVORITES, LOAD_FAVORITES__SUCCESS, LOAD_FAVORITES__FAILURE, ADD_FAVORITES, ADD_FAVORITES__SUCCESS, ADD_FAVORITES__FAILURE, REMOVE_FAVORITES__SUCCESS, REMOVE_FAVORITES__FAILURE, REMOVE_FAVORITES } from "../../reducers/favorites/actions";





//тут должен был быть запрос на серввер, но у mockapi проблемы с id и из-за этого все сохраняется в loocalStorage
export function* loadFavoritesList({payload}) {
    try {
        const data = getStorage(payload) ? getStorage(payload) : [];

        yield  put({
            type: LOAD_FAVORITES__SUCCESS,
            payload: data
        })
    } catch(error){
        yield  put({
            type: LOAD_FAVORITES__FAILURE,
            payload: 'Произошла ошибка, перезагрузите страницу'
        })
        
    }
}

export function* loadFavoritesOnRouterEnter() {
    while(true) {
         const action = yield take(LOCATION_CHANGE);

        if(action.payload.location.pathname === '/favorites' || action.payload.location.pathname === '/'){
            yield put({
                type: LOAD_FAVORITES,
                payload: 'favorites'
            })
        }
    }   
}


export function* addFavoritesItem({payload}) {

    try{
        yield put({
            type: ADD_FAVORITES__SUCCESS,
            payload 
        })
    } catch(error){
        console.log(error);
        yield put({
            type: ADD_FAVORITES__FAILURE,
            payload: "Ошибка получается"
        })
    }
}

export function* removeFavoritesItem({payload}) {
    try{
        yield put({
            type: REMOVE_FAVORITES__SUCCESS,
            payload 
        })
    } catch(error){
        yield put({
            type: REMOVE_FAVORITES__FAILURE,
            payload: "Ошибка получается"
        })
    }
}

export default function* loadFavoritesSaga() {
    yield fork(loadFavoritesOnRouterEnter)
    yield takeEvery(LOAD_FAVORITES, loadFavoritesList)
    yield takeEvery(REMOVE_FAVORITES,removeFavoritesItem)
    yield takeEvery(ADD_FAVORITES, addFavoritesItem)
}