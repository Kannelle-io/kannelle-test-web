import * as Sentry from '@sentry/react';
import throttle from 'lodash/throttle';
import { applyMiddleware, combineReducers, createStore, Middleware, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Company from '../model/Company';
import LocalStorage from './LocalStorage';
import { ChartersMiddleware } from './middleware/ChartersMiddleware';
import { AppReducer } from './reducer/AppReducer';
import { ChartersReducer } from './reducer/ChartersReducer';
import { CompaniesReducer } from './reducer/CompaniesReducer';
import { UserReducer } from './reducer/UserReducer';

export default class StoreCreator {
  private readonly reduxStore: Store;

  constructor() {
    this.reduxStore = this.initialize();

    this.reduxStore.subscribe(
      throttle(() => {
        LocalStorage.saveState({
          charters: this.reduxStore.getState().charters,
          companies: {
            list: this.reduxStore.getState().companies.list?.map((company: Company) => company.toJsonModel()),
            current: this.reduxStore.getState().companies.current?.toJsonModel(),
          },

          user: {
            user: this.reduxStore.getState().user?.user,
            // local storage cant use class based object so we serialize it
            role: this.reduxStore.getState().user?.role?.currentRole,
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
      companies: CompaniesReducer,
      charters: ChartersReducer,
    });
  };

  get store(): Store {
    return this.reduxStore;
  }
}
