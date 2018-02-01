import 'babel-polyfill';

import App from './components/app/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Config } from './config';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter basename = {Config.getValue('routerPrefix')}>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
);