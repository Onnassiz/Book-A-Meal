import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, reducer);


export default () => {
  const history = createHistory();
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(
      thunk,
      logger,
      routerMiddleware(history),
    ), window.devToolsExtension ? window.devToolsExtension() : f => f),
  );
  const persistor = persistStore(store);
  return { store, persistor, history };
};

