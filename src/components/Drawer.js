import React, { useEffect, useState } from 'react';
import Info from './Info';

import { useDispatch, useSelector } from 'react-redux';

import { REMOVE_BASKET, DELETE_ALL_BASKET} from '../redux/reducers/basket/actions';
import { ADD_ORDER } from '../redux/reducers/order/actions';

import  '../scss/drawer.scss';
import  '../scss/arrow-anim.scss';

const PERCENT = 5

function Drawer({ setCartOpen}) {
  const [isOrder, setIsOrder] = useState(false);

  const {loading, error, data} = useSelector(state => state.basket);

  const errorOrder = useSelector(state => state.orders.error)
  const orders = useSelector(state => state.orders.data)

  const dispatch = useDispatch();
  
  const removeBasket = (id) => {
    dispatch({
      type: REMOVE_BASKET,
      payload: id
    })
  }


  const сheckout = () => {
    dispatch({
      type: ADD_ORDER,
      payload: {
        id: orders.length + 1,
        date: new Date().toLocaleDateString(),
        totalPrice: totalPrice,
        totalPercent: totalPercent,
        sneakers: data
      }
    })
    if(errorOrder) {
      alert('Ошибка при оформлении заказа')
    } else {
      dispatch({
        type: DELETE_ALL_BASKET,
      })
      setIsOrder(true)
    }
    

  } 
  
  const totalPrice = data.reduce((a, b) => a + (b.price || 0), 0) 
  const totalPercent = Math.ceil(totalPrice/100 * PERCENT)
  


  return (
    <div className="drawer">
        <div className="drawer-block" >
         <button onClick={() => setCartOpen(false)} className="drawer-block__close">
             <span></span>
           </button>
          <h3>Корзина</h3>
                <div className="drawer-block__content">
                    {
                      data.length > 0 ? (
                      <>
                      <div className="cart-list">
                        {data.map(obj => (
                            <div key={obj.id} className="cart-item">
                              <div className="cart-item__img">
                                <img src={`/react-sneakers/${obj.imgUrl}`} alt=""/>
                              </div>
                              <div className="cart-item__text">
                                <h4>{obj.name}</h4>
                                <p>{obj.price}</p>
                              </div>
                              <button className="cart-item__btn" onClick={() => removeBasket(obj.parenId)}><span></span></button>
                            </div>
                        ))}
                      </div>
                            <div className="drawer-footer">
                              <div className="drawer-footer__item">
                                <h5>Итого: </h5>
                                <span></span>
                                <p>{totalPrice} руб.</p>
                              </div>
                              <div className="drawer-footer__item">
                                <h5>Налог {PERCENT}%:</h5>
                                <span></span>
                                <p>{totalPercent} руб.</p>
                              </div>
                              <button  onClick={сheckout} className="drawer-footer__btn btn-green">
                                <p>Оформить заказ <i className="fas fa-arrow-right"></i></p>
                              </button>
                            </div>

                          </>
                      ) : (
                        <Info
                          onCloseCart={() => setCartOpen(false)}
                          title=  {isOrder ? 'Заказ оформлен' : 'Корзина пустая!'}
                          desc={isOrder ? 'История заказа добавлена на страницу профиля' : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                          img={isOrder ? 'img/order.png' : 'img/cart-empty.svg'}
                        />
                        
                      )
                    }
                  
                </div>
           
        </div>
      </div>
  )
}
export default Drawer

