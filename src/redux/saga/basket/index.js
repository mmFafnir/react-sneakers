import axios from "axios";
import { LOCATION_CHANGE } from "connected-react-router";
import { takeEvery, apply, take, put, call, fork, takeLatest } from "redux-saga/effects";
import { getStorage } from "../../../hooks/storage";
import { ADD_BASKET, ADD_BASKET__FAILURE, ADD_BASKET__SUCCESS, DELETE_ALL_BASKET, DELETE_ALL_BASKET__FAILURE, DELETE_ALL_BASKET__SUCCESS, LOAD_BASKET, LOAD_BASKET__FAILURE, LOAD_BASKET__SUCCESS, REMOVE_BASKET, REMOVE_BASKET__FAILURE, REMOVE_BASKET__SUCCESS } from "../../reducers/basket/actions";





//тут должен был быть запрос на серввер, но у mockapi проблемы с id и из-за этого все сохраняется в loocalStorage
export function* loadBasketList({payload}) {
    try {
        const data = getStorage(payload) ? getStorage(payload) : [] 
        yield  put({
            type:  LOAD_BASKET__SUCCESS,
            payload: data
        })
    } catch(error){
        yield  put({
            type: LOAD_BASKET__FAILURE,
            payload: 'Произошла ошибка, перезагрузите страницу'
        })
        
    }
}

export function* loadBasketOnRouterEnter() {
    while(true) {
        const action = yield take(LOCATION_CHANGE);
        yield put({
            type: LOAD_BASKET,
            payload: 'basket'
        })
    }   
}


export function* addBasketItem({payload}) {

    try{
        yield put({
            type: ADD_BASKET__SUCCESS,
            payload 
        })
    } catch(error){
        console.log(error);
        yield put({
            type: ADD_BASKET__FAILURE,
            payload: "Ошибка получается"
        })
    }
}

export function* removeBasketItem({payload}) {
    try{
        yield put({
            type: REMOVE_BASKET__SUCCESS,
            payload 
        })
    } catch(error){
        yield put({
            type: REMOVE_BASKET__FAILURE,
            payload: "Ошибка получается"
        })
    }
}


export function* deleteAllBasket() {
    try{
        yield put({
            type: DELETE_ALL_BASKET__SUCCESS
        })
    } catch(error){
        yield put({
            type: DELETE_ALL_BASKET__FAILURE
        })
    }
}

export default function* loadBasketSaga() {
    yield fork(loadBasketOnRouterEnter)
    yield takeEvery(LOAD_BASKET, loadBasketList)
    yield takeEvery(ADD_BASKET, addBasketItem)
    yield takeEvery(REMOVE_BASKET,removeBasketItem)
    yield takeEvery(DELETE_ALL_BASKET, deleteAllBasket)
}