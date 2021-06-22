import { Layout } from 'antd';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import KannelleHeader from '../../components/header/KannelleHeader';

const { Content } = Layout;

const useStyles = createUseStyles({
  contentLayout: {
    position: 'absolute',
    top: 64,
    minHeight: 'calc(100% - 64px)',
  },
  contentLayoutMobileOrCollapsedMenu: {
    left: 0,
    width: '100% !important',
  },
  content: {
    margin: '16px 16px 70px',
    minHeight: 'unset',
    height: '100%',
  },
});
type Props = {
  children: JSX.Element | JSX.Element[];
};

const Shell: FunctionComponent<Props> = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Layout>
      <KannelleHeader />
      <Layout className={classNames(classes.contentLayout, classes.contentLayoutMobileOrCollapsedMenu)}>
        <Content className={classes.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Shell;
