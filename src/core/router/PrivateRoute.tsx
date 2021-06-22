import React, { FunctionComponent } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import SecurityCheckRoute from './SecurityCheckRoute';

type Props = {
  path: string;
  isAllowed: boolean;
} & RouteProps;

const PrivateRoute: FunctionComponent<Props> = ({ component, path, isAllowed, ...rest }: Props) => {
  const Component = component!;

  const render = (props: any): JSX.Element | null =>
    isAllowed ? <SecurityCheckRoute component={Component} {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
