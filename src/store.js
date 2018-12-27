import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import { localStorageMiddleware, promiseMiddleware } from './middleware';
import createRootReducer from './reducers';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, localStorageMiddleware, promiseMiddleware);
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(
    myRouterMiddleware,
    localStorageMiddleware,
    promiseMiddleware,
    createLogger(),
  );
};

export const store = createStore(
  createRootReducer(history),
  getMiddleware(),
);
