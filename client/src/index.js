import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import { createBrowserHistory } from 'history';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);