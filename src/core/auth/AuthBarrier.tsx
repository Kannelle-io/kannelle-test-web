import log from 'loglevel';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import KannelleLoader from '../../components/loader/KannelleLoader';
import { LINK } from '../../Constants';
import { setAPIToken, setIsUserUnauthorized } from '../../redux/action/AppAction';
import { initializeUser } from '../../redux/action/UserAction';
import { APIManager } from '../../services/api/APIManager';
import { getUserById } from '../../services/api/UsersService';
import { useAuth0 } from './Auth0Config';

type Props = {
  children: React.ReactNode;
};

const AuthBarrier: FunctionComponent<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, loginWithRedirect, user, getTokenSilently } = useAuth0();
  const history = useHistory();

  const [wasAccessTokenSet, setWasAccessTokenSet] = useState(false);
  const [initializedSession, setInitializedSession] = useState(false);

  // Redirect the user to the authentication form if needed
  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const authenticate = async (): Promise<void> => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    };
    authenticate();
  }, [loading, isAuthenticated, loginWithRedirect]);

  // Set the API access token that we got from Auth0's authentication
  useEffect(() => {
    const setupAPIAccessToken = async (): Promise<void> => {
      if (isAuthenticated) {
        const token = await getTokenSilently();
        APIManager.setAccessToken(token);
        dispatch(setAPIToken(token));
        setWasAccessTokenSet(true);
        log.info('Access token was correctly set.');
      } else {
        APIManager.clearAccessToken();
        setWasAccessTokenSet(false);
      }
    };
    setupAPIAccessToken();
  }, [isAuthenticated, getTokenSilently, dispatch]);

  useEffect(() => {
    if (!isAuthenticated || !user || !wasAccessTokenSet) {
      return;
    }

    const auth0UserIdPrefix = process.env.REACT_APP_AUTH0_USER_ID_PREFIX ?? '';
    const userId = user?.sub.replace(auth0UserIdPrefix, '');
    Promise.all([getUserById(userId)])
      .then(([userResponse]) => {
        dispatch(initializeUser(userResponse.data));
        dispatch(setIsUserUnauthorized(false));
        setInitializedSession(true);

        history.push(LINK.HOME.path);
      })
      .catch((error) => {
        log.error(error);
        dispatch(setIsUserUnauthorized(true));
        history.push(LINK.UNAUTHORIZED.path);
      });
    // eslint-disable-next-line
  }, [user, isAuthenticated, wasAccessTokenSet, dispatch, history]);

  if (loading || !wasAccessTokenSet || !initializedSession) {
    return <KannelleLoader />;
  }

  if (!(isAuthenticated && user && user.email_verified)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthBarrier;
