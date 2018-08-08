
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


import App from './components/pages/App';
import '../assets/scss/styles.scss';

import all from './store';

const store = all();

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <ConnectedRouter history={store.history}>
        <HashRouter>
          <App />
        </HashRouter>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('index'),
);
