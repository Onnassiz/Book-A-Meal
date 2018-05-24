
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';

import { store, history } from './store';

import App from './components/pages/App';
import '../assets/scss/styles.scss';


ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('index'),
);
