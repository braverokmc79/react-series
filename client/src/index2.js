import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import Reducer from './_reducers';
import { configureStore } from "@reduxjs/toolkit";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={configureStore({ reducer: Reducer })}>
    configureStore 사용11
    < App />
  </Provider >

);



