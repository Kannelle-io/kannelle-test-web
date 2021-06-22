import React, { Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import './App.css';
import KannelleLoader from './components/loader/KannelleLoader';
import Router from './core/router/Router';

const useStyles = createUseStyles({
  '@global': {
    body: {
      fontFamily:
        "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",

      '&.overflowHidden': {
        overflow: 'hidden',
      },
    },
    '.ant-statistic-content': {
      fontFamily:
        "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    },
  },
});

const App: React.FunctionComponent = () => {
  // needed to initialise global css param
  useStyles();

  return (
    <Suspense fallback={<KannelleLoader />}>
      <Router />
    </Suspense>
  );
};

export default App;
