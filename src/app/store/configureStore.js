import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(promiseMiddleware());
  const store = createStore(rootReducer, initialState, middleware);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
