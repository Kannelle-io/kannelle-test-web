import { Action, action } from 'typesafe-actions';
import { APIModelUser } from '../../services/api/types/UsersServiceTypes';

export enum USER_ACTION_TYPE {
  INITIALIZE_USER = 'INITIALIZE_USER',
}

export const initializeUser = (user: APIModelUser): Action => {
  return action(USER_ACTION_TYPE.INITIALIZE_USER, user);
};
