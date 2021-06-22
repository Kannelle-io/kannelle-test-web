import { Roles } from '../../core/rule/RolesTypes';
import { APIModelCharter } from '../../services/api/types/ChartersServiceTypes';
import { RootState } from '../RootState';

export class ChartersMiddlewareService {
  static getCharterFromStateById = (state: RootState, charterId: number): APIModelCharter | undefined => {
    return state.charters.list?.filter((charter) => charter.id === charterId)[0];
  };

  static getCurrentUserRoleByCharter = (charter?: APIModelCharter): string => {
    return charter?.currentUser.role || Roles.Creator;
  };
}
