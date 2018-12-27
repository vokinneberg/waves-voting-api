import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  AUTH_USER,
  UNAUTH_USER,
} from './constants/actionTypes';

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => (action) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const { skipTracking } = action;

    action.payload.then(
      (res) => {
        const a = action;
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log('RESULT', res);
        a.payload = res;
        store.dispatch({ type: ASYNC_END, promise: a.payload });
        store.dispatch(a);
      },
      (error) => {
        const a = action;
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log('ERROR', error);
        a.error = true;
        a.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: a.payload });
        }
        store.dispatch(a);
      },
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => (action) => {
  if (action.type === AUTH_USER) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === UNAUTH_USER) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware, promiseMiddleware };
