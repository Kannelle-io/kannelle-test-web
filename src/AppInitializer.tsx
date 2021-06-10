import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import App from './App';
import { RootState } from './redux/RootState';

const AppInitializer: React.FunctionComponent = () => {
  const isUserUnauthorized = useSelector((state: RootState) => state.app.isUnauthorized);

  // Hide the Satismeter widget for unauthorized users
  // (in some cases, it might have been displayed before reaching the unauthorized page)
  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (isUserUnauthorized === undefined || !isUserUnauthorized) {
    }
  }, [isUserUnauthorized]);

  return <App />;
};

export default AppInitializer;
