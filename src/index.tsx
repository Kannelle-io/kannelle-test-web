import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-lato';
import AppInitializer from './AppInitializer';
import Auth0Provider from './core/auth/Auth0Config';
import history from './core/router/History';
import './i18n';
import './index.css';
import StoreCreator from './redux/StoreCreator';
import AuthUtils from './utils/AuthUtils';

const storeCreator = new StoreCreator();
const { store } = storeCreator;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const auth0RedirectUri = AuthUtils.getAuthEnvironmentVariable(process.env.REACT_APP_AUTH0_REDIRECT_URI) || '';
const APIBaseURL = process.env.REACT_APP_API_BASE_URL || '';

const onRedirectCallback = (appState: any): void => {
  // this function is called only on Login
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

const callbackInitLoggingTools = (user: any, newAuthentication: boolean): void => {
  if (newAuthentication) {
    console.log({
      email: user.email,
      method: 'Email',
      name: user.name,
      companyId: store ? store.getState()?.companies?.current?.id : undefined,
      charter: store ? store.getState()?.charters?.list : undefined,
    });
  }
};

ReactDOM.render(
  // TODO: Reactivate StrictMode when AntD issue is solved (see https://github.com/ant-design/ant-design/issues/22493)
  // <React.StrictMode>
  <Provider store={store}>
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientId}
      redirect_uri={auth0RedirectUri}
      onRedirectCallback={onRedirectCallback}
      callbackInitLoggingTools={callbackInitLoggingTools}
      audience={APIBaseURL}
    >
      <AppInitializer />
    </Auth0Provider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
