import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx';
import {Config} from "./config";
import 'babel-polyfill';

render (
    (
        <BrowserRouter basename={Config.getValue("routerPrefix")}>
            <App />
        </BrowserRouter>
    ), document.getElementById('app')
);