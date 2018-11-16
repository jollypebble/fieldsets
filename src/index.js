import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from 'redux-base/reducers';

import 'static/styles/index.css';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
