import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteProps } from 'react-router-dom';
import EmptyPageContent from '../../components/empty/EmptyPageContent';
import KannelleLoader from '../../components/loader/KannelleLoader';
import { useAuth0 } from '../auth/Auth0Config';

type Props = {
  path: string;
  isAllowed: boolean;
} & RouteProps;

const SecurityCheckRoute: FunctionComponent<Props> = ({ component, ...props }: any) => {
  const Component = component!;
  const [isUrlAccessible] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    const auth0UserIdPrefix = process.env.REACT_APP_AUTH0_USER_ID_PREFIX ?? '';
    const userId = user?.sub.replace(auth0UserIdPrefix, '');
    if (userId) {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <KannelleLoader />;
  }

  return isUrlAccessible ? <Component {...props} /> : <EmptyPageContent />;
};

export default SecurityCheckRoute;
