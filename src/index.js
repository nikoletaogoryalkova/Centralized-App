import 'babel-polyfill';

import App from './components/app/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Config } from './config';
import React from 'react';
import { render } from 'react-dom';

render(
    <BrowserRouter basename = {Config.getValue('routerPrefix')}>
        <App />
    </BrowserRouter>
    , document.getElementById('app')
);