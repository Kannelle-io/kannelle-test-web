import { createReducer } from '@reduxjs/toolkit';
import log from 'loglevel';
import { APIFullModelCharter, APIModelCharter, UsersModelCharter } from '../../services/api/types/ChartersServiceTypes';
import { APP_ACTION_TYPE } from '../action/AppAction';
import { CHARTERS_ACTION_TYPE } from '../action/ChartersAction';

export type ChartersState = {
  list?: Array<APIModelCharter>;
  current?: APIFullModelCharter;
  currentCharterUsers?: UsersModelCharter[];
};

const initialState: ChartersState = {
  list: undefined,
  current: undefined,
};

export const ChartersReducer = createReducer(initialState, {
  [APP_ACTION_TYPE.RESET_STORE_STATE]: () => {
    log.info('Store Hard reset Charters');
    return { ...initialState };
  },
  [CHARTERS_ACTION_TYPE.SET_CHARTERS_LIST]: (draftState, action) => {
    log.info('We fetched the current charters successfully: ', action.payload);
    draftState.list = [...action.payload];
  },
  [CHARTERS_ACTION_TYPE.SELECT_CHARTER]: (draftState, action) => {
    log.info('We selected the charter: ', action.payload);
    draftState.current = action.payload;
  },
});
