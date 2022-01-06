import axios from "axios";
import { LOCATION_CHANGE } from "connected-react-router";
import { takeEvery, apply, take, put, call, fork, takeLatest } from "redux-saga/effects";
import { getStorage } from "../../../hooks/storage";
import { DELETE_ALL_BASKET, LOAD_BASKET__FAILURE } from "../../reducers/basket/actions";
import { ADD_ORDER, ADD_ORDER__FAILURE, ADD_ORDER__SUCCESS, LOAD_ORDER, LOAD_ORDER__FAILURE, LOAD_ORDER__SUCCESS, REMOVE_ORDER, REMOVE_ORDER__SUCCESS } from "../../reducers/order/actions";
import { deleteAllBasket } from "../basket";





//тут должен был быть запрос на серввер, но у mockapi проблемы с id и из-за этого все сохраняется в loocalStorage
export function* loadOrdersList({payload}) {
    try {
        const data = getStorage(payload) ? getStorage(payload) : [];
        
        console.log('data: ', data);
        yield  put({
            type: LOAD_ORDER__SUCCESS,
            payload: data
        })
    } catch(error){
        console.log('error: ', error);
        yield  put({
            type: LOAD_BASKET__FAILURE,
            payload: 'Произошла ошибка, перезагрузите страницу'
        })
        
    }
}

export function* loadOrdersOnRouterEnter() {
    while(true) {
         const action = yield take(LOCATION_CHANGE);

        if(action.payload.location.pathname === '/orders'){
            yield put({
                type: LOAD_ORDER,
                payload: 'orders'
            })
        }
    }   
}


export function* addOrdersItem({payload}) {
    console.log(payload);
    try{
        yield put({
            type: ADD_ORDER__SUCCESS,
            payload 
        })

    } catch(error){
        yield put({
            type: ADD_ORDER__FAILURE,
            payload: "Ошибка получается"
        })
    }
}

export function* removeOrdersItem({payload}) {
    try{
        yield put({
            type: REMOVE_ORDER__SUCCESS,
            payload 
        })
    } catch(error){
        yield put({
            type: LOAD_ORDER__FAILURE,
            payload: "Ошибка получается"
        })
    }
}

export default function* loadOrdersSaga() {
    yield fork(loadOrdersOnRouterEnter)
    yield takeEvery(LOAD_ORDER, loadOrdersList)
    yield takeEvery(REMOVE_ORDER,removeOrdersItem)
    yield takeEvery(ADD_ORDER, addOrdersItem)
}