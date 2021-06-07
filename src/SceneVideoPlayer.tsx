import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactPlayer from 'react-player';
import useWindowSize from './hooks/useWindowSize';
import LottiePlayer from './LottiePlayer';
import { AnimationPosition, AnimationPositionStyle, Size } from './types/AnimationType';
import AnimationService from './utils/AnimationService';
import RuleOfThirdsGrid from './RuleOfThirdsGrid';

type Props = {
  isSlide: boolean;
  videoUrl?: string;
  lottieAnimation: any;
  format: string;
  animationPosition: AnimationPosition;
  showGrid: boolean;
};

type StyleProps = {
  sceneVideoPlayerSize?: Size;
  lottiePlayerSize?: Size;
  animationPositionStyle?: AnimationPositionStyle;
};

const useStyles = createUseStyles({
  sceneVideoPlayerWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sceneVideoPlayerContainer: ({ sceneVideoPlayerSize }: StyleProps) => ({
    height: sceneVideoPlayerSize?.height ?? '100%',
    width: sceneVideoPlayerSize?.width ?? '100%',
    position: 'relative',
  }),
  videoContainer: {
    height: '100%',
  },
  lottiePlayer: ({ lottiePlayerSize, animationPositionStyle }: StyleProps) => {
    const { top, right, bottom, left } = animationPositionStyle || {};
    return {
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      ...(top !== undefined && { top }),
      ...(right !== undefined && { right }),
      ...(bottom !== undefined && { bottom }),
      ...(left !== undefined && { left }),
      height: lottiePlayerSize?.height ?? '100%',
      width: lottiePlayerSize?.width ?? '100%',
      '& > svg': {
        maxHeight: '100%',
        display: 'block',
      },
    };
  },
});

const SceneVideoPlayer: FunctionComponent<Props> = ({
  isSlide,
  videoUrl,
  lottieAnimation,
  format,
  animationPosition,
  showGrid,
}: Props) => {
  const [sceneVideoPlayerSize, setSceneVideoPlayerSize] = useState<Size>();
  const [lottiePlayerSize, setLottiePlayerSize] = useState<Size>();
  const [animationPositionStyle, setAnimationPositionStyle] = useState<AnimationPositionStyle>();

  const classes = useStyles({
    lottiePlayerSize,
    sceneVideoPlayerSize,
    animationPositionStyle,
  });
  const sceneVideoPlayerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const windowSize = useWindowSize();

  // From the rendered SceneVideoPlayer, calculate the scene component sizes
  useEffect(() => {
    if (sceneVideoPlayerRef.current) {
      // Get the rendered total size of the sceneVideoPlayerRef (16:9 black rectangle)
      const boundingRect = sceneVideoPlayerRef.current.getBoundingClientRect();
      const playerInitialSize = {
        width: boundingRect.width,
        height: boundingRect.height,
      };

      // Compute the size of the sceneVideoPlayer (into the right format, fitting into the 16:9 black rectangle)
      const videoPlayerSize = AnimationService.getVideoPlayerSizeByFormat(format, playerInitialSize);
      setSceneVideoPlayerSize(videoPlayerSize);

      // Compute the animation size (scale it)
      const newLottiePlayerSize = AnimationService.getAnimationPlayerSize(lottieAnimation, videoPlayerSize, format);
      setLottiePlayerSize(newLottiePlayerSize);

      // Compute the animation position style depending on the configured animation position
      const positionStyle = AnimationService.getAnimationPositionStyle(format, animationPosition, videoPlayerSize);
      setAnimationPositionStyle(positionStyle);
    }
  }, [lottieAnimation, format, animationPosition, sceneVideoPlayerRef, windowSize]);

  return (
    <div ref={sceneVideoPlayerRef} className={classes.sceneVideoPlayerWrapper}>
      <div className={classes.sceneVideoPlayerContainer}>
        {showGrid && <RuleOfThirdsGrid />}
        {!isSlide && videoUrl && (
          <div className={classes.videoContainer}>
            <ReactPlayer url={videoUrl} width="100%" height="100%" ref={videoPlayerRef} />
          </div>
        )}

        <div>
          <LottiePlayer animationData={lottieAnimation} play loop className={classes.lottiePlayer} />
        </div>
      </div>
    </div>
  );
};

export default SceneVideoPlayer;
