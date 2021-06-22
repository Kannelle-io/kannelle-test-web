import { Action, action } from 'typesafe-actions';
import { APIFullModelCharter, APIModelCharter } from '../../services/api/types/ChartersServiceTypes';

export enum CHARTERS_ACTION_TYPE {
  SET_CHARTERS_LIST = 'SET_CHARTERS_LIST',
  SELECT_CHARTER_BY_ID = 'SELECT_CHARTER_BY_ID',
  SELECT_CHARTER = 'SELECT_CHARTER',
}

export const setChartersList = (charters: Array<APIModelCharter>): Action => {
  return action(CHARTERS_ACTION_TYPE.SET_CHARTERS_LIST, charters);
};

export const selectCharterById = (charterId: number): Action => {
  return action(CHARTERS_ACTION_TYPE.SELECT_CHARTER_BY_ID, charterId);
};

export const selectCharter = (charter: APIModelCharter | APIFullModelCharter): Action => {
  return action(CHARTERS_ACTION_TYPE.SELECT_CHARTER, charter);
};
