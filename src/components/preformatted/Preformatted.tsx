import classNames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  preformatted: {
    padding: '.2em .4em',
    margin: '0',
    fontSize: '75%',
    backgroundColor: 'rgba(27,31,35,.05)',
    borderRadius: '3px',
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
    width: 'fit-content',
  },
});

type Props = {
  children: JSX.Element[] | JSX.Element | ReactNode | string;
  className?: string;
};

const Preformatted: FunctionComponent<Props> = ({ className, children }: Props) => {
  const classes = useStyles();

  return <span className={classNames(classes.preformatted, className)}>{children}</span>;
};

export default Preformatted;
