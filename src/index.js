import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunc from 'redux-thunk';

import './styles/index.css';
import App from './components/App';
import reducer from './store';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunc)));

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);