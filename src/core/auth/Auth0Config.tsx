/* eslint-disable @typescript-eslint/no-explicit-any */
import createAuth0Client, {
  Auth0ClientOptions,
  getIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  RedirectLoginResult,
  User,
} from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import log from 'loglevel';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { APIManager } from '../../services/api/APIManager';

interface Auth0ContextOptions {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: (options: PopupLoginOptions) => Promise<void>;
  handleRedirectCallback: () => Promise<RedirectLoginResult>;
  getIdTokenClaims: (o?: getIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (o: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (o?: GetTokenSilentlyOptions) => Promise<string>;
  getTokenWithPopup: (o?: GetTokenWithPopupOptions) => Promise<string>;
  logout: (o?: LogoutOptions) => void;
}

interface Auth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback?: (result: RedirectLoginResult) => void;
  callbackInitLoggingTools: (user: any, newAuthentication: boolean) => void;
}

const DEFAULT_REDIRECT_CALLBACK = (): void => window.history.replaceState({}, document.title, window.location.pathname);

const Auth0Context = React.createContext<Auth0ContextOptions | null>(null);
export const useAuth0 = (): Auth0ContextOptions => useContext(Auth0Context)!;

type Props = Auth0ProviderOptions & Auth0ClientOptions;

const Auth0Provider: FunctionComponent<Props> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  callbackInitLoggingTools,
  ...initOptions
}: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();

  useEffect(() => {
    const initAuth0 = async (): Promise<void> => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0Client(auth0FromHook);
      let newAuthentication = false;
      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        newAuthentication = true;
        onRedirectCallback(appState);
      }
      const authenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(authenticated);

      if (authenticated) {
        const auth0User = await auth0FromHook.getUser();
        setUser(auth0User);
        const token = await auth0FromHook.getTokenSilently();
        APIManager.setAccessToken(token);
        callbackInitLoggingTools(auth0User, newAuthentication);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  if (!auth0Client) {
    return null;
  }

  const loginWithPopup = async (o: PopupLoginOptions): Promise<void> => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(o);
    } catch (error) {
      log.error(error);
    } finally {
      setPopupOpen(false);
    }
    const auth0User = await auth0Client.getUser();
    setUser(auth0User);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async (): Promise<RedirectLoginResult> => {
    setLoading(true);
    const result = await auth0Client.handleRedirectCallback();
    const auth0User = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(auth0User);
    return result;
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (o?: getIdTokenClaimsOptions): Promise<IdToken> => auth0Client.getIdTokenClaims(o),
        loginWithRedirect: (o?: RedirectLoginOptions): Promise<void> => auth0Client.loginWithRedirect(o),
        getTokenSilently: (o?: GetTokenSilentlyOptions): Promise<any> => auth0Client.getTokenSilently(o),
        getTokenWithPopup: (o?: GetTokenWithPopupOptions): Promise<string> => auth0Client!.getTokenWithPopup(o),
        logout: (o?: LogoutOptions): void => auth0Client.logout(o),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
/* eslint-enable @typescript-eslint/no-explicit-any */
