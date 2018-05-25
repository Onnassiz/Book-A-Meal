
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { HashRouter } from 'react-router-dom';

import { store, history } from './store';

import App from './components/pages/App';
import '../assets/scss/styles.scss';


ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<HashRouter>
				<App />
			</HashRouter>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('index'),
);
