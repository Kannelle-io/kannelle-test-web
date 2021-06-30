import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  grid: {
    display: 'grid',
    gridGap: '0px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    '& > div:not(:nth-child(3n))': {
      borderRight: '1px solid #D0D0D0',
      zIndex: 3,
    },
    '& > div:not(:nth-child(7)):not(:nth-child(8)):not(:nth-child(9))': {
      borderBottom: '1px solid #D0D0D0',
      zIndex: 3,
    },
  },
});

const RuleOfThirdsGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default RuleOfThirdsGrid;
