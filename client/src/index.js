import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import 'babel-polyfill';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import 'typeface-roboto';
import {attemptFacebookAuth, getMyMemes} from "./actions";

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

// set auth object in store
store.dispatch(attemptFacebookAuth());
// preload users first 30 memes
store.dispatch(getMyMemes('memes/mine'));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
