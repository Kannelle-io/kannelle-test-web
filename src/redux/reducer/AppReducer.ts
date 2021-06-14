import { createReducer } from '@reduxjs/toolkit';
import log from 'loglevel';
import { APP_ACTION_TYPE } from '../action/AppAction';

export type AppState = {
  isUnauthorized?: boolean;
  apiToken: string;
};

const initialState: AppState = {
  isUnauthorized: undefined,
  apiToken: '',
};

export const AppReducer = createReducer(initialState, {
  [APP_ACTION_TYPE.RESET_STORE_STATE]: () => {
    log.info('Store Hard reset App');
    return { ...initialState };
  },
  [APP_ACTION_TYPE.SET_IS_USER_UNAUTHORIZED]: (draftState, action) => {
    draftState.isUnauthorized = action?.payload?.isUnauthorized ?? false;
  },
  [APP_ACTION_TYPE.SET_API_TOKEN]: (draftState, action) => {
    draftState.apiToken = action.payload;
  },
});
