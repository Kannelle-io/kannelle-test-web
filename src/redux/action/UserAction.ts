import { Action, action } from 'typesafe-actions';
import { APIModelUser } from '../../services/api/types/UsersServiceTypes';

export enum USER_ACTION_TYPE {
  INITIALIZE_USER = 'INITIALIZE_USER',
  SET_CURRENT_USER_ROLE = 'SET_CURRENT_USER_ROLE',
}

export const initializeUser = (user: APIModelUser): Action => {
  return action(USER_ACTION_TYPE.INITIALIZE_USER, user);
};

export const setCurrentUserRole = (role: string): Action => {
  return action(USER_ACTION_TYPE.SET_CURRENT_USER_ROLE, role);
};
