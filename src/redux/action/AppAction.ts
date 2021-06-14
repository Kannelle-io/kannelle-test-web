import { Action, action } from 'typesafe-actions';

export enum APP_ACTION_TYPE {
  TOGGLE_MENU = 'TOGGLE_MENU',
  SET_IS_USER_UNAUTHORIZED = 'SET_IS_USER_UNAUTHORIZED',
  RESET_STORE_STATE = 'RESET_STORE_STATE',
  SET_API_TOKEN = 'SET_API_TOKEN',
}

export const toggleMenu = (): Action => {
  return action(APP_ACTION_TYPE.TOGGLE_MENU);
};

export const setIsUserUnauthorized = (isUnauthorized: boolean): Action => {
  return action(APP_ACTION_TYPE.SET_IS_USER_UNAUTHORIZED, { isUnauthorized });
};

export const resetStoreState = (): Action => {
  return action(APP_ACTION_TYPE.RESET_STORE_STATE);
};

export const setAPIToken = (token: string): Action => {
  return action(APP_ACTION_TYPE.SET_API_TOKEN, token);
};
