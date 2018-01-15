import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx';
import {Config} from "./config";
import 'babel-polyfill';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadReservations} from './actions/reservationActions';

const store = configureStore();
store.dispatch(loadReservations());

render (
    (
        <Provider store={store}>
            <BrowserRouter basename={Config.getValue("routerPrefix")}>
                <App />
            </BrowserRouter>
        </Provider>
    ), document.getElementById('app')
);