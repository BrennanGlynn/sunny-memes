import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react'
import storage from 'redux-persist/lib/storage';
import {Provider} from 'react-redux';
import reducer from './reducers';
import 'babel-polyfill';
import {unregister} from './registerServiceWorker';
import './index.css';
import App from './App';
import {attemptFacebookAuth} from "./actions";

const loggerMiddleware = createLogger()
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

// const persistor = persistStore(store)

// set auth object in store
store.dispatch(attemptFacebookAuth());

ReactDOM.render(
  <Provider store={store}>
    {/*<PersistGate loading={null} persistor={persistor}>*/}
      <App/>
    {/*</PersistGate>*/}
  </Provider>,
  document.getElementById('root'));

unregister();
