import { Empty } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  emptyContainer: {
    minHeight: '100vh',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
});

const EmptyPageContent: FunctionComponent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.emptyContainer}>
      <Empty description={<Link to="/home">{t('global.backToHome')}</Link>} />
    </div>
  );
};

export default EmptyPageContent;
