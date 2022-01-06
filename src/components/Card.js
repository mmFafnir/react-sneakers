import React, { useEffect, useState } from 'react';
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BASKET, REMOVE_BASKET } from '../redux/reducers/basket/actions';

import { ADD_FAVORITES, REMOVE_FAVORITES } from '../redux/reducers/favorites/actions';

import  '../scss/card.scss';

function Card({name, price, imgUrl, parenId , id, loading}) {
  

  // const [isFavorite, setIsFavorite] = useState()
  const favorite = useSelector(state => state.favorites.data)
  const basket = useSelector(state => state.basket.data)

  const isFavorite = favorite.length > 0 ? (favorite.find(item => item.parenId == parenId) ? true : false) : false
  const isBasket = basket.length > 0 ? (basket.find(item => item.parenId == parenId) ? true : false) : false

  const dispatch = useDispatch();
  const addFavotites = () =>  {
    dispatch({
        type: ADD_FAVORITES,
        payload: {
          "name": name, 
          "price":Number(price), 
          "imgUrl":imgUrl, 
          "parenId":Number(parenId), 
          "id":Number(id)
        }
    })
  }
  
  
  const removeFavorites = () => {
    dispatch({
      type: REMOVE_FAVORITES,
      payload: parenId
    })
  }
  
  
  const addBasket = () => {
    dispatch({
      type: ADD_BASKET,
      payload: {
        "name": name, 
        "price":Number(price), 
        "imgUrl":imgUrl, 
        "parenId":Number(parenId), 
        "id":Number(id)
      }
    })
  }

  const removeBasket = () => {
    dispatch({
      type: REMOVE_BASKET,
      payload: parenId
    })
  }




  return (
    <>
    {
      loading ? (
        <ContentLoader
            speed={2}
            width={210}
            height={260}
            viewBox="0 0 210 260"
            backgroundColor="#f0f0f0"
            foregroundColor="#c4c4c4"
          >
            <rect x="30" y="36" rx="9" ry="9" width="150" height="91" />
            <rect x="30" y="145" rx="3" ry="3" width="150" height="15" />
            <rect x="30" y="172" rx="3" ry="3" width="93" height="15" />
            <rect x="30" y="199" rx="8" ry="8" width="80" height="24" />
            <rect x="148" y="191" rx="8" ry="8" width="32" height="32" />
          </ContentLoader>
      ) : (
        <div className="card">
            <div className="card__img">
              <button 
                onClick={isFavorite ? removeFavorites : addFavotites} 
                className={isFavorite ? "card__btn-like active" : "card__btn-like "}
              >
                  <i className="fas fa-heart"></i>
              </button>          
              <img src={`/react-sneakers${imgUrl}`} alt=""/>
            </div>
            <div className="card__title">
              <h2>{name}</h2>
            </div>
            <div className="card__footer">
              <div className="card__price">
                <span>Цена:</span>
                <p>{price}</p>
              </div>
              <button onClick={isBasket ? removeBasket : addBasket} className={isBasket ? "card__btn active" : "card__btn"}>
                <span></span>
              </button>
            </div>
        </div>
      )
    }
    </>
  )
}
export default Card

