import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import Reducer from './_reducers';
import { configureStore } from "@reduxjs/toolkit";

import logger from 'redux-logger'
const store = configureStore({
  // composeWithDevtools, thunk 자동 활성화
  reducer: Reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    configureStore 사용112
    < App />
  </Provider >

);



