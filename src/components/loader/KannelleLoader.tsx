import { Spin } from 'antd';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import { THEME } from '../../Constants';

type Props = {
  transparent?: boolean;
};

const useStyles = createUseStyles({
  loaderContainer: {
    backgroundColor: '#f0f2f5',
    position: 'absolute',
    width: '100%',
    minHeight: '100vh',
    zIndex: 2,
    top: 0,
    left: 0,
  },
  transparentLoader: {
    opacity: 0.6,
    position: 'fixed',
    zIndex: 20,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  spin: {
    '& .ant-spin-dot-item': {
      backgroundColor: THEME.DEFAULT.MAIN_COLOR,
    },
    '& .ant-spin-text': {
      color: THEME.DEFAULT.MAIN_COLOR,
    },
  },
});

const KannelleLoader: FunctionComponent<Props> = ({ transparent = false }: Props) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.loaderContainer, transparent && classes.transparentLoader)}>
      <div className={classes.loader}>
        <Spin className={classes.spin} size="large" />
      </div>
    </div>
  );
};

export default KannelleLoader;
