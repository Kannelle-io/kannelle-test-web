import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactPlayer from 'react-player';
import useWindowSize from './hooks/useWindowSize';
import LottiePlayer from './LottiePlayer';
import { AnimationPosition, AnimationPositionStyle, Size } from './types/AnimationType';
import AnimationService from './utils/AnimationService';
import TimeUtils from './utils/TimeUtils';
import RuleOfThirdsGrid from './RuleOfThirdsGrid';
import { Button, Slider } from 'antd';
import { BsPauseFill, BsPlayFill, FaExpand } from 'react-icons/all';

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
  displayControls: boolean;
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
  controlBarContainer: ({ displayControls }: StyleProps) => ({
    padding: 10,
    height: 40,
    zIndex: 3,
    background: '#00000070',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    opacity: displayControls ? 1 : 0,
    transition: 'opacity 0.4s',
    '& > *:not(:last-child)': {
      marginRight: 15,
    },
  }),
  controlButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
  },
  controlSeekBar: {
    display: 'flex',
    flexGrow: 2,
  },
  timeValue: {
    color: 'white',
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [sceneDuration, setSceneDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [sceneVideoPlayerSize, setSceneVideoPlayerSize] = useState<Size>();
  const [lottiePlayerSize, setLottiePlayerSize] = useState<Size>();
  const [animationPositionStyle, setAnimationPositionStyle] = useState<AnimationPositionStyle>();
  const [displayControls, setDisplayControls] = useState(false);

  const classes = useStyles({
    lottiePlayerSize,
    sceneVideoPlayerSize,
    animationPositionStyle,
    displayControls,
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

  // Whenever the currentTime changes, we seek to the currentTime in the video player
  useEffect(() => {
    if (videoPlayerRef.current && isPlayerReady && !isPlaying) {
      videoPlayerRef.current.getInternalPlayer().currentTime = currentTime;
    }
  }, [currentTime, isPlaying, videoPlayerRef]);

  // The scene duration is either the animation duration if the scene is a Slide (no video),
  // else it is the video duration (and the animation might be truncated)
  useEffect(() => {
    if (isSlide) {
      setSceneDuration(animationDuration);
    } else {
      setSceneDuration(videoDuration);
    }
  }, [isSlide, videoDuration, animationDuration]);

  // Callback to display the controls bar
  const onDisplayControls = () => {
    setDisplayControls(true);
  };

  // Callback to hide the controls bar
  const onHideControls = () => {
    setDisplayControls(false);
  };

  // Callback when the play button is clicked
  const onPlayClick = () => {
    setIsPlaying(true);
  };

  // Callback when the pause button is clicked
  const onPauseClick = () => {
    setIsPlaying(false);
  };

  // Callback when the LottiePlayer loaded the animation and computed its duration
  const onAnimationDurationChange = (duration: number) => {
    setAnimationDuration(duration);
  };

  // Callback when the ReactPlayer loaded the video and computed its duration
  const onVideoDurationChange = (duration: number) => {
    setVideoDuration(duration);
  };

  // Callback when the video is playing and its current time is progressing
  const onProgress = (progressState: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    const { playedSeconds } = progressState;
    setCurrentTime(playedSeconds);
  };

  // Callback when the ReactPlayer loaded the video successfully and is ready to play
  const onReady = () => {
    setIsPlayerReady(true);
  };

  // Callback when the currentTime value has been changed in the seek bar
  // If the scene is playing, we force pausing it first
  // Then, we set the currentTime according to the percentage value from the seek bar
  const onSeekBarChange = (percentage?: number) => {
    if (percentage !== undefined) {
      setIsPlaying(false);
      setCurrentTime(percentage * sceneDuration);
    }
  };

  // Callback when the animation is playing to update the scene current time
  // We ignore that for non-slide scenes since the currentTime value is computed from
  // the video in such cases
  const onAnimationProgress = (playedSeconds: number) => {
    if (!isSlide) {
      return;
    }
    setCurrentTime(playedSeconds);
  };

  // Render the control bar
  const renderPlayerControlBar = () => {
    return (
      <div className={classes.controlBarContainer}>
        {isPlaying ? (
          <BsPauseFill className={classes.controlButton} onClick={onPauseClick} />
        ) : (
          <BsPlayFill className={classes.controlButton} onClick={onPlayClick} />
        )}

        <div className={classes.timeValue}>{TimeUtils.formatSecondsIntoDuration(currentTime)}</div>

        <Slider
          className={classes.controlSeekBar}
          min={0}
          max={1}
          step={0.01}
          onChange={onSeekBarChange}
          value={AnimationService.getScenePercentage(currentTime, sceneDuration)}
          tipFormatter={null}
        />

        <div className={classes.timeValue}>{TimeUtils.formatSecondsIntoDuration(sceneDuration)}</div>
      </div>
    );
  };

  return (
    <div
      ref={sceneVideoPlayerRef}
      className={classes.sceneVideoPlayerWrapper}
      onMouseEnter={onDisplayControls}
      onMouseLeave={onHideControls}
    >
      <div className={classes.sceneVideoPlayerContainer}>
        {showGrid && <RuleOfThirdsGrid />}

        {!isSlide && videoUrl && (
          <div className={classes.videoContainer}>
            <ReactPlayer
              url={videoUrl}
              playing={isPlaying}
              loop
              muted
              width="100%"
              height="100%"
              onReady={onReady}
              onProgress={onProgress}
              progressInterval={1}
              onDuration={onVideoDurationChange}
              ref={videoPlayerRef}
            />
          </div>
        )}

        <div>
          <LottiePlayer
            animationData={lottieAnimation}
            goTo={TimeUtils.fromSecondsToMillis(currentTime)}
            play={isPlaying}
            loop={isSlide}
            onDurationChange={onAnimationDurationChange}
            onCurrentTimeChange={onAnimationProgress}
            className={classes.lottiePlayer}
          />
        </div>
      </div>

      {renderPlayerControlBar()}
    </div>
  );
};

export default SceneVideoPlayer;
