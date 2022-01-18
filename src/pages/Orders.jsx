import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { REMOVE_ORDER } from '../redux/reducers/order/actions';

import Order from '../components/Order';

import '../scss/header.scss'
import '../scss/logo.scss'
import '../scss/orders.scss'
import Info from '../components/Info';


function Orders() {

  const {loading, error, data} = useSelector(state => state.orders)
  const dispatch = useDispatch();

  const deleteOrder = (id) => dispatch({
      type: REMOVE_ORDER,
      payload: id,
  })

 
  
  return (
    <div className='orders'>
      <h1>История заказов</h1>
    {
      data.length == 0 ? (
        <div className="favorites-null">
          <div className="favorites-null__body">
            <div className="favorites-null__smail"></div>
                <h2>Заказов нет :(</h2>
                <p>Вы не оформили ни один заказ </p>
                <Link to="/">
                  <button className="favorites-null__btn btn-green">
                    <p> <i className="fas fa-arrow-left"></i>Вернуться</p>
                  </button>
                </Link>
          </div>
        </div>
      ) : (
        <div className='orders__list'>
          <ul className='orders__list_desc'>
            <li className='orders__number'>Номер заказа</li>
            <li className='orders__date'>Дата</li>
            <li className='orders__quantity'>Количество</li>
            <li className='orders__sum'>Сумма</li>
          </ul>
          {
            data.map(order => (
              <Order key={order.id} click={() => deleteOrder(order.id)} {...order}/>
            ))
          }
        </div>
      )
    }
      
    </div>
  )
}
export default Orders
