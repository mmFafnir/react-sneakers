import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux'
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/reducers';

import App from './App';

import './scss/null.scss';
import './index.css';








ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);
