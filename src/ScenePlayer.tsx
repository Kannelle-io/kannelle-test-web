import React, { FunctionComponent, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import SceneVideoPlayer from './SceneVideoPlayer';
import { AnimationPosition } from './types/AnimationType';
import AnimationService from './utils/AnimationService';

type Props = {
  animation: string;
  lottieAnimation: string;
  format: string;
  animationPosition: AnimationPosition;
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
  animation,
  lottieAnimation,
  format,
  animationPosition,
  showGrid,
}: Props) => {
  const classes = useStyles();
  const [isSlide, setIsSlide] = useState(false);
  // For the demo
  const [sampleVideo, setSampleVideo] = useState<string>();

  // Check if the animation is a Slide
  useEffect(() => {
    setIsSlide(AnimationService.isSlideAnimation(animation));
  }, [animation]);

  // For the demo: select a sample video of the right format if the video is a Slide
  useEffect(() => {
    if (isSlide) {
      setSampleVideo(undefined);
      return;
    }

    setSampleVideo(AnimationService.getSampleVideoByFormat(format));
  }, [isSlide, format]);

  return (
    <div className={classes.scenePlayerWrapper}>
      <div className={classes.scenePlayerContainer}>
        <SceneVideoPlayer
          isSlide={isSlide}
          videoUrl={sampleVideo}
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
