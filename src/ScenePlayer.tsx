import React, { FunctionComponent, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import SceneVideoPlayer from './SceneVideoPlayer';
import { AnimationPosition } from './types/AnimationType';
import AnimationService from './utils/AnimationService';

type Props = {
  lottieAnimation: string;
  format: string;
  animationPosition: AnimationPosition;
  isSlide: boolean;
  videoUrl?: string;
  showGrid: boolean;
};

const useStyles = createUseStyles({
  scenePlayerWrapper: {
    background: 'black',
    height: 0,
    paddingBottom: '56.25%', // (1 / ratio) * 100% where ratio = 16/9
    width: '100%',
    position: 'relative',
  },
  scenePlayerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const ScenePlayer: FunctionComponent<Props> = ({
  lottieAnimation,
  format,
  animationPosition,
  isSlide,
  videoUrl,
  showGrid,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.scenePlayerWrapper}>
      <div className={classes.scenePlayerContainer}>
        <SceneVideoPlayer
          isSlide={isSlide}
          videoUrl={videoUrl}
          lottieAnimation={lottieAnimation}
          format={format}
          animationPosition={animationPosition}
          showGrid={showGrid}
        />
      </div>
    </div>
  );
};

export default ScenePlayer;
