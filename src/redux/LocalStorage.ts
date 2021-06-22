import { Role } from '../core/rule/Roles';
import Company from '../model/Company';
import { APIModelCompany } from '../services/api/types/CompaniesServiceTypes';
import { RootState, RootStateSerialized } from './RootState';

export default class LocalStorage {
  static loadState = (): Partial<RootState> | undefined => {
    try {
      const serializedState = localStorage.getItem('state-kannelle-dashboard');
      if (serializedState === null) {
        return undefined;
      }
      return LocalStorage.transformSerializedRootStateToRootState(JSON.parse(serializedState));
    } catch (err) {
      return undefined;
    }
  };

  static saveState = (state: Partial<RootStateSerialized>): void => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state-kannelle-dashboard', serializedState);
    } catch (err) {
      // Ignore write errors
    }
  };

  static transformSerializedRootStateToRootState = (
    serializedState: RootStateSerialized
  ): Partial<RootState> | undefined => {
    try {
      if (serializedState === null) {
        return undefined;
      }

      const controlledSerializedState = { ...serializedState };
      const role = controlledSerializedState.user.role ? new Role(controlledSerializedState.user.role) : undefined;

      return {
        charters: controlledSerializedState.charters,
        companies: {
          list: controlledSerializedState.companies.list.map((company: APIModelCompany) => new Company(company)),
          current: new Company(controlledSerializedState.companies.current),
        },
        user: {
          user: controlledSerializedState.user.user,
          role,
        },
      };
    } catch (err) {
      return undefined;
    }
  };
}
