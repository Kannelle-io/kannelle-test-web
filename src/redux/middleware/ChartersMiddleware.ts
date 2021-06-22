import { Dispatch, Middleware } from 'redux';
import { APIFullModelCharter, APIModelCharter } from '../../services/api/types/ChartersServiceTypes';
import { CHARTERS_ACTION_TYPE, selectCharter } from '../action/ChartersAction';
import { setCurrentUserRole } from '../action/UserAction';
import { RootState } from '../RootState';
import { ChartersMiddlewareService } from '../service/ChartersMiddlewareService';

export const ChartersMiddleware: Middleware =
  (api) =>
  (next) =>
  (action): Dispatch => {
    if (action.type === CHARTERS_ACTION_TYPE.SELECT_CHARTER_BY_ID) {
      // this may be moved to another file
      const state: RootState = api.getState();
      const { payload: charterId }: { payload: number } = action;
      const charter = ChartersMiddlewareService.getCharterFromStateById(state, charterId);
      if (charter) {
        api.dispatch(selectCharter(charter));
      }
    }

    if (action.type === CHARTERS_ACTION_TYPE.SELECT_CHARTER) {
      const state: RootState = api.getState();
      const { payload: selectedCharter }: { payload: APIModelCharter | APIFullModelCharter } = action;
      const charterFromList = ChartersMiddlewareService.getCharterFromStateById(state, selectedCharter.id);
      const role = ChartersMiddlewareService.getCurrentUserRoleByCharter(charterFromList);
      next(setCurrentUserRole(role));
    }

    return next(action);
  };
