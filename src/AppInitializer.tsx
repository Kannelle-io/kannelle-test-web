import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import App from './App';
import { useAuth0 } from './core/auth/Auth0Config';
import { resetStoreState } from './redux/action/AppAction';
import LocalStorage from './redux/LocalStorage';

const AppInitializer: React.FunctionComponent = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !isAuthenticated) {
      return;
    }

    const auth0UserIdPrefix = process.env.REACT_APP_AUTH0_USER_ID_PREFIX ?? '';
    const userId = user?.sub.replace(auth0UserIdPrefix, '');

    const persistedState = LocalStorage.loadState();
    if (persistedState?.user?.user?.id && persistedState?.user?.user?.id !== userId) {
      dispatch(resetStoreState());
    }
  }, [user, isAuthenticated, dispatch]);

  return <App />;
};

export default AppInitializer;
