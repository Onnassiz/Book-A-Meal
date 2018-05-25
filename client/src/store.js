import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import reducer from './reducer';

export const history = createHistory();

export const store = createStore(
	reducer,
	compose(applyMiddleware(
		thunk,
		logger,
		routerMiddleware(history),
	), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

