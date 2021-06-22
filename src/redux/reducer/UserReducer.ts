import { createReducer } from '@reduxjs/toolkit';
import log from 'loglevel';
import { Role } from '../../core/rule/Roles';
import { Roles } from '../../core/rule/RolesTypes';
import { APIModelUser } from '../../services/api/types/UsersServiceTypes';
import { APP_ACTION_TYPE } from '../action/AppAction';
import { USER_ACTION_TYPE } from '../action/UserAction';

export type UserState = {
  user: APIModelUser | undefined;
  role: Role | undefined;
};

export type UserSerializedState = {
  user: APIModelUser | undefined;
  role: Roles | undefined;
};

const initialState: UserState = {
  user: undefined,
  role: undefined,
};

export const UserReducer = createReducer(initialState, {
  [APP_ACTION_TYPE.RESET_STORE_STATE]: () => {
    log.info('Store Hard reset user');
    return { ...initialState };
  },
  [USER_ACTION_TYPE.INITIALIZE_USER]: (draftState, action) => {
    log.info('We fetched the current user successfully: ', action.payload);
    draftState.user = action.payload;
  },
  [USER_ACTION_TYPE.SET_CURRENT_USER_ROLE]: (draftState, action) => {
    log.info('Set current user role: ', action.payload);
    draftState.role = new Role(action.payload);
  },
});
