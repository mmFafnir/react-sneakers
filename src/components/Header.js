import React from 'react';
import { Link } from "react-router-dom";

import '../scss/header.scss'
import '../scss/logo.scss'


function Header({setCartOpen}) {

  return (
    <header className="header">
      <div className="header__left">
       <Link to="/">
         <div className="header__logo logo">
            <div className="logo__img">
              <img src="/img/logo.svg" alt=""/>
            </div>
            <div className="logo__text">
              <h2>REACT SNEAKERS</h2>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
       </Link>
      </div>
      <div className="header__right">
        <ul className="header__info">
          <li onClick={() =>  setCartOpen(true)}><img src="/react-sneakers/img/basket.svg" alt=""/> <p></p></li>
          <li>
            <Link to="/favorites">
              <img src="/react-sneakers/img/like.svg" alt=""/>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img src="/react-sneakers/img/akk.svg" alt=""/>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
export default Header
