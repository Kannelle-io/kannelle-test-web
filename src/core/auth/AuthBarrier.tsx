import log from 'loglevel';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import KannelleLoader from '../../components/loader/KannelleLoader';
import { LINK } from '../../Constants';
import Company from '../../model/Company';
import { setAPIToken, setIsUserUnauthorized } from '../../redux/action/AppAction';
import { setChartersList } from '../../redux/action/ChartersAction';
import { initializeCompanies, selectCompany } from '../../redux/action/CompaniesAction';
import { initializeUser } from '../../redux/action/UserAction';
import { RootState } from '../../redux/RootState';
import { APIManager } from '../../services/api/APIManager';
import { getCompaniesByUser } from '../../services/api/CompaniesService';
import { getUserById } from '../../services/api/UsersService';
import CompaniesUtils from '../../utils/CompaniesUtils';
import SecurityUtils from '../../utils/SecurityUtils';
import { useAuth0 } from './Auth0Config';

type Props = {
  children: React.ReactNode;
};

const AuthBarrier: FunctionComponent<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, loginWithRedirect, user, getTokenSilently } = useAuth0();
  const history = useHistory();
  const [currentCompanyFromState] = useSelector((state: RootState) => {
    return [state.companies.current];
  });

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
    Promise.all([getCompaniesByUser(userId), getUserById(userId)])
      .then(([companiesResponse, userResponse]) => {
        // only active company (just to be sure)
        const activeCompanies: Company[] = CompaniesUtils.getValidCompany(companiesResponse.data.items);

        // TODO this is to be changed in a near future
        if (currentCompanyFromState?.created) {
          activeCompanies.push(currentCompanyFromState);
          dispatch(initializeCompanies(activeCompanies));
          dispatch(setChartersList([]));
          dispatch(initializeUser(userResponse.data));
          setInitializedSession(true);
          return;
        }

        dispatch(initializeCompanies(activeCompanies));

        if (!SecurityUtils.isPlatformAccessible(activeCompanies)) {
          dispatch(setIsUserUnauthorized(true));
          history.push(LINK.UNAUTHORIZED.path);
          return;
        }

        const currentCompany = CompaniesUtils.getCurrentCompany(activeCompanies, currentCompanyFromState);
        const charters = currentCompany?.getCompanyAllowedCharters();

        // we need to reselect the company to update the config (that might have been updated)
        dispatch(selectCompany(currentCompany));
        dispatch(setChartersList(charters));
        dispatch(initializeUser(userResponse.data));
        dispatch(setIsUserUnauthorized(false));
        setInitializedSession(true);

        if (currentCompany.id !== currentCompanyFromState?.id) {
          history.push(LINK.HOME.path);
        }
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
