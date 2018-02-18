import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import authReducer from './store/reducers/auth';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import registerServiceWorker from './registerServiceWorker';

import './index.css';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; //hooking up REDUX-CHROME-DEV_TOOLS

const rootReducer = combineReducers({
	ingr: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer

});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


const app = (<BrowserRouter><App /></BrowserRouter>)

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
registerServiceWorker();
