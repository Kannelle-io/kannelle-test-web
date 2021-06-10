import { Action, action } from 'typesafe-actions';

export enum APP_ACTION_TYPE {
  SET_IS_USER_UNAUTHORIZED = 'SET_IS_USER_UNAUTHORIZED',
  SET_API_TOKEN = 'SET_API_TOKEN',
}
export const setIsUserUnauthorized = (isUnauthorized: boolean): Action => {
  return action(APP_ACTION_TYPE.SET_IS_USER_UNAUTHORIZED, { isUnauthorized });
};

export const setAPIToken = (token: string): Action => {
  return action(APP_ACTION_TYPE.SET_API_TOKEN, token);
};
