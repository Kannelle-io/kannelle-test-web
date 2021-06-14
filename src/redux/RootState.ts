import { AppState } from './reducer/AppReducer';
import { ChartersState } from './reducer/ChartersReducer';
import { CompaniesState, CompanySerializedState } from './reducer/CompaniesReducer';
import { UserSerializedState, UserState } from './reducer/UserReducer';

export interface RootState {
  app: AppState;
  user: UserState;
  companies: CompaniesState;
  charters: ChartersState;
}

export interface RootStateSerialized {
  user: UserSerializedState;
  companies: CompanySerializedState;
  charters: ChartersState;
}
