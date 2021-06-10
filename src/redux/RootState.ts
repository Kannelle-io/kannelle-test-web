import { AppState } from './reducer/AppReducer';
import { UserSerializedState, UserState } from './reducer/UserReducer';

export interface RootState {
  app: AppState;
  user: UserState;
}

export interface RootStateSerialized {
  user: UserSerializedState;
}
