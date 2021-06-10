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
      // we reset the processing assets always
      return {
        user: {
          user: controlledSerializedState.user.user,
        },
      };
    } catch (err) {
      return undefined;
    }
  };
}
