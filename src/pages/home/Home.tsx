import { CancelTokenSource } from 'axios';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import LottieAnimation from '../../components/lottieAnimation/LottieAnimation';
import { APIManager } from '../../services/api/APIManager';

const Home: FunctionComponent = () => {
  const cancelTokenSourceRef = useRef<CancelTokenSource>(APIManager.getCancelToken());

  useEffect(() => {
    const cancelTokenSource = cancelTokenSourceRef.current;

    return (): void => {
      cancelTokenSource.cancel('Cancelled cloning company due to component unmount.');
    };
  }, []);

  return <LottieAnimation />;
};

export default Home;
