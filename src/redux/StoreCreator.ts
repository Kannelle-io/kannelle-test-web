import * as Sentry from '@sentry/react';
import throttle from 'lodash/throttle';
import { applyMiddleware, combineReducers, createStore, Middleware, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import LocalStorage from './LocalStorage';
import { ChartersMiddleware } from './middleware/ChartersMiddleware';
import { AppReducer } from './reducer/AppReducer';
import { UserReducer } from './reducer/UserReducer';

export default class StoreCreator {
  private readonly reduxStore: Store;

  constructor() {
    this.reduxStore = this.initialize();

    this.reduxStore.subscribe(
      throttle(() => {
        LocalStorage.saveState({
          user: {
            user: this.reduxStore.getState().user?.user,
          },
        });
      }, 1000)
    );
  }

  initialize = (): Store => {
    const composeEnhancers = composeWithDevTools({ trace: true });
    const persistedState = LocalStorage.loadState();
    const sentryReduxEnhancer = Sentry.createReduxEnhancer({});
    return createStore(
      this.createReducers(),
      persistedState,
      composeEnhancers(applyMiddleware(...this.getMiddleWares()), sentryReduxEnhancer)
    );
  };

  getMiddleWares = (): Array<Middleware> => {
    return [ChartersMiddleware];
  };

  createReducers = (): Reducer => {
    return combineReducers({
      app: AppReducer,
      user: UserReducer,
    });
  };

  get store(): Store {
    return this.reduxStore;
  }
}
