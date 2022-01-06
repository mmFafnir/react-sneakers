import {all, spawn} from 'redux-saga/effects'
import loadBasketSaga from './basket';
import loadFavoritesSaga from './favorites';
import loadOrdersSaga from './order';
import loadSneakersSaga from './sneakers';



export default function* rootSaga() {
    const sagas = [loadSneakersSaga, loadFavoritesSaga, loadBasketSaga, loadOrdersSaga];
    yield all(sagas.map(saga => spawn(saga)))
}