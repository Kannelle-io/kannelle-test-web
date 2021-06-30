import { Layout } from 'antd';
import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import logoKnl from '../../resources/img/K-rectangle.png';
import KannelleHeaderUserInfo from './KannelleHeaderUserInfo';

const { Header } = Layout;

const useStyles = createUseStyles({
  header: {
    backgroundColor: '#fff',
    padding: '0 8px 0 0',
    boxShadow: '-3px 3px 3px #ecebeb',
    position: 'fixed',
    top: 0,
    zIndex: 4,
    width: '100%',
  },

  logoContainer: {
    maxWidth: 200,
    textAlign: 'center',
    height: '64px',
    lineHeight: '64px',
    padding: '0 8px',
    marginRight: 8,
  },
  logo: {
    width: '90%',
    maxWidth: 182,
    minWidth: 170,
    maxHeight: 64,
  },
  rightItems: {
    float: 'right',
  },
});

const KannelleHeader: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Header className={classes.header}>
      <span className={classes.logoContainer}>
        <img className={classes.logo} src={logoKnl} alt="logo" />
      </span>
      <span className={classes.rightItems}>
        <KannelleHeaderUserInfo />
      </span>
    </Header>
  );
};

export default KannelleHeader;
