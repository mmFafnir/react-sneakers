import React from 'react';
import drawerScss from '../scss/drawer.scss';
import arrowAnim from '../scss/arrow-anim.scss';
import { AppContext } from '../App'


function Info({ onCloseCart, title, img, desc}) {

  return (
    <div className="drawer-block__empty">
      <img src={img} alt=""/>
      <h2>{title}</h2>
      <p>{desc}</p>
      <button className="btn-green " onClick={onCloseCart}><i className="fas fa-arrow-left"></i>Вернуться назад</button>
    </div>
  )
}
export default Info

