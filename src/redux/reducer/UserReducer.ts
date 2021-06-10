import { createReducer } from '@reduxjs/toolkit';
import log from 'loglevel';
import { APIModelUser } from '../../services/api/types/UsersServiceTypes';
import { USER_ACTION_TYPE } from '../action/UserAction';

export type UserState = {
  user: APIModelUser | undefined;
};

export type UserSerializedState = {
  user: APIModelUser | undefined;
};

const initialState: UserState = {
  user: undefined,
};

export const UserReducer = createReducer(initialState, {
  [USER_ACTION_TYPE.INITIALIZE_USER]: (draftState, action) => {
    log.info('We fetched the current user successfully: ', action.payload);
    draftState.user = action.payload;
  },
});
