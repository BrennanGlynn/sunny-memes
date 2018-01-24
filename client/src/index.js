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
import {fetchPosts, selectSubreddit} from "./actions";

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs'))
  .then(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
