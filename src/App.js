import { useState } from 'react';
import {
  Switch  ,
  Route,
} from 'react-router-dom';

import './App.scss';
import './scss/media.scss'

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"

import { useSelector } from 'react-redux';




function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const {loading, error, data} = useSelector(state => state.sneakers)




  
  return (
      <div className="App">
        <Header
          setCartOpen={setCartOpen}
        />
        <Switch>
          <Route path="/react-sneakers/favorites">
            <Favorites
 
            />
          </Route>
          <Route exact path="/react-sneakers" >
            <Home 
              loading={loading}
              error={error}
              data={data}
            />
          </Route>

          <Route exact path="/react-sneakers/orders" >
            <Orders />
          </Route>

        </Switch>

        {cartOpen ?
          <Drawer
            setCartOpen = {setCartOpen}
          />
        : null}
      </div>
  );
}

export default App;
