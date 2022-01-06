import React, { useState } from 'react';



function Order({id, date, sneakers, totalPrice, click}) {

  const [active, setActive] = useState(false)
  
  return (
    <div className='order'>
        <ul className='order__header'>
            <li onClick={() => setActive(!active)} className={active ? 'order__title active  ' : 'order__title'}>
                <i className="fas fa-chevron-down"></i>
                <p>Заказ {id}№</p>
            </li>
            <li className='order__date'>
                {date}
            </li>
            <li className='order__quantity'>
                {sneakers.length}
            </li>
            <li className='order__price'>
                {totalPrice}₽
            </li>
        </ul>

        <div className={active ? 'order-goods active' : 'order-goods' }>
            <ul className='order-goods__header order-goods__row'>
                <li>Товар</li>
                <li>Цена</li>
            </ul>
            {
                sneakers.map(item => (

                    <ul key={item.id} className='order-goods__item order-goods__row'>
                        <li className='order-goods__name'>{item.name}</li>
                        <li>{item.price}₽</li>
                    </ul>
                ))
            }
        <button onClick={click} className='order-delete'>Удалить</button>
        </div>
    </div>
  )
}
export default Order

