import { applyMiddleware, createStore } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers/_combined';
import reduxReadStateFromStorage from '../middlewares/readStateFromStorage';
import reduxSaveStateIntoStorage from '../middlewares/saveStateIntoStorage';

function getLoggerMiddleware() {
  let logger = null;

  if (process.env.NODE_ENV === 'development') {
    logger = createLogger({
      collapsed: true,
      stateTransformer: state => {
        const loggedState = {
          __transformedKeys: []
        };

        Object.keys(state).forEach(key => {
          const stateNode = state[key];

          if (typeof stateNode.toJS === 'function') {
            loggedState.__transformedKeys.push(key);
            loggedState[key] = stateNode.toJS();
          } else {
            loggedState[key] = stateNode;
          }
        });

        return loggedState;
      }
    });
  }

  return logger;
}

/**
 * Creates the client side store by reading the server side store
 * @returns {*}
 */
function createClientSideStore() {
  const initialState = window.__STORE_INITIAL_STATE || {};
  const loggerMiddleware = getLoggerMiddleware();
  const middlewares = [reduxReadStateFromStorage, reduxSaveStateIntoStorage, reduxThunkMiddleware];

  if (loggerMiddleware) {
    middlewares.push(loggerMiddleware);
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

  return createStoreWithMiddleware(reducers, initialState);
}

const store = createClientSideStore();

// hot reloading for reducers
if (module.hot) {
  module.hot.accept('../reducers/_combined', () => {
    const nextReducer = require('../reducers/_combined').default; // eslint-disable-line

    store.replaceReducer(nextReducer);
  });
}

export default store;
