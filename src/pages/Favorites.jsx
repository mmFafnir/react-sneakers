import React from 'react';

import { Link } from "react-router-dom";

import Card from "../components/Card";

import "../scss/favorites.scss";
import '../scss/arrow-anim.scss';
import { useSelector } from 'react-redux';

function Favorites() {

  const {loading, error, data} = useSelector(state=> state.favorites)
  console.log('data: ', data);
  return (
    <div className="favorites">

      
          <div className="favorites__body">
             <h1>Мои закладки</h1>
                {
                  data.length > 0 ? (
                  <div className="favorites__content">
                    {(loading ? [...Array(8)] : data).map((item ,index) => (
                      <Card 
                        key={index}
                        loading={loading}
                        {...item}
                      />
                    ))}
                  </div>

                  ) : (
                    <div className="favorites-null">
                    <div className="favorites-null__body">
                      <div className="favorites-null__smail">
                      </div>
                      <h2>Закладок нет :б</h2>
                      <p>Вы ничего не добавляли в закладки</p>
                      <Link to="/">
                        <button className="favorites-null__btn btn-green">
                          <p> <i className="fas fa-arrow-left"></i>Вернуться назад</p>
                        </button>
                      </Link>

                    </div>
                  </div>

                  )
                }
            </div> 
      


    </div>
  );
}

export default Favorites;
