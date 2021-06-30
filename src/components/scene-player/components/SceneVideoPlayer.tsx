import { Button, Modal, Slider } from 'antd';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { BiFullscreen, BsPauseFill, BsPlayFill } from 'react-icons/all';
import { createUseStyles } from 'react-jss';
import ReactPlayer from 'react-player';
import useWindowSize from '../../../hooks/useWindowSize';
import AnimationService from '../../../services/AnimationService';
import { AnimationPosition, AnimationPositionStyle, PIP, Size } from '../../../types/AnimationType';
import TimeUtils from '../../../utils/TimeUtils';
import LottiePlayer from '../../lottie-player/LottiePlayer';
import RuleOfThirdsGrid from '../../rule-of-thirds-grid/RuleOfThirdsGrid';
import SceneVideoPlayerImagePIP from './SceneVideoPlayerImagePIP';

type Props = {
  isSlide: boolean;
  videoUrl?: string;
  lottieAnimation?: any;
  format: string;
  animationPosition?: AnimationPosition;
  fullscreenDisabled?: boolean;
  pip?: PIP;
  initialIsPlaying?: boolean;
  initialTime?: number;
  controls?: boolean;
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
      zIndex: 2,
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
    cursor: 'pointer',
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
  fullscreenModal: {
    width: '75% !important',
    '& .ant-modal-body': {
      position: 'relative',
    },
  },
  videoPlayerContainerInModal: {
    marginTop: 30,
    position: 'relative',
    background: 'black',
  },
});

const SceneVideoPlayer: FunctionComponent<Props> = ({
  showGrid,
  isSlide,
  videoUrl,
  lottieAnimation,
  format,
  animationPosition,
  fullscreenDisabled = false,
  pip,
  initialIsPlaying = false,
  initialTime = 0,
  controls = true,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [sceneDuration, setSceneDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [sceneVideoPlayerSize, setSceneVideoPlayerSize] = useState<Size>();
  const [lottiePlayerSize, setLottiePlayerSize] = useState<Size>();
  const [animationPositionStyle, setAnimationPositionStyle] = useState<AnimationPositionStyle>();
  const [displayControls, setDisplayControls] = useState(false);
  const [isFullscreenModalVisible, setIsFullscreenModalVisible] = useState(false);
  const [isUsingEmptyVideo, setIsUsingEmptyVideo] = useState(false);

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
      if (lottieAnimation) {
        const newLottiePlayerSize = AnimationService.getAnimationPlayerSize(lottieAnimation, videoPlayerSize, format);
        setLottiePlayerSize(newLottiePlayerSize);
      }

      // Compute the animation position style depending on the configured animation position
      if (animationPosition) {
        const positionStyle = AnimationService.getAnimationPositionStyle(format, animationPosition, videoPlayerSize);
        setAnimationPositionStyle(positionStyle);
      }
    }
  }, [lottieAnimation, format, animationPosition, sceneVideoPlayerRef, windowSize]);

  // If the empty video is used, set the isUsingEmptyVideo state to true
  useEffect(() => {
    setIsUsingEmptyVideo(videoUrl ? AnimationService.isVideoEmpty(videoUrl) : false);
  }, [videoUrl]);

  // Whenever the initialTime changes, we seek to the initialTime in the video player and set the currentTime
  useEffect(() => {
    if (initialTime && videoPlayerRef.current && isPlayerReady) {
      setCurrentTime(initialTime);
      videoPlayerRef.current.seekTo(initialTime, 'seconds');
    }
  }, [initialTime, isPlayerReady, videoPlayerRef]);

  // If the currentTime is greater than the sceneDuration, we reset it to 0 and
  // reset the player to 0 too. This is especially useful for Slide animations
  // using the empty video as background.
  useEffect(() => {
    if (currentTime > sceneDuration && videoPlayerRef.current && isPlayerReady) {
      setCurrentTime(0);
      videoPlayerRef.current.seekTo(0, 'seconds');
    }
  }, [currentTime, sceneDuration]);

  // Whenever the currentTime changes, we seek to the currentTime in the video player
  useEffect(() => {
    if (videoPlayerRef.current && isPlayerReady && !isPlaying) {
      videoPlayerRef.current.seekTo(currentTime, 'seconds');
    }
  }, [currentTime, isPlaying, videoPlayerRef]);

  // The scene duration is either the animation duration if the scene is a Slide
  // (or if the empty video is used, in case only a Recordable animation is set),
  // else it is the pipTotal duration, or the video duration (and the animation
  // might be truncated)
  useEffect(() => {
    // In case of a Slide, we use the animation duration
    if (isSlide) {
      setSceneDuration(animationDuration);
      return;
    }

    // If there is a video which is the videoEmpty
    if (isUsingEmptyVideo) {
      // If a pip is defined, use the pip total duration
      if (pip) {
        const pipTotalDuration = pip.duration + pip.startAt;
        setSceneDuration(pipTotalDuration);
      } else {
        // Else use the animation duration (if the videoEmpty is used, we know an animation is set)
        setSceneDuration(animationDuration);
      }
      return;
    }

    // In any other case, use the video duration, or the animation duration as fallback
    setSceneDuration(videoDuration ?? animationDuration);
  }, [isSlide, videoDuration, animationDuration, isUsingEmptyVideo, pip]);

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
    if (!isPlaying) {
      return;
    }
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
      const newTime = percentage * sceneDuration;
      setCurrentTime(newTime);
    }
  };

  // Callback when opening the fullscreen modal
  const onOpenFullscreenModal = () => {
    setIsFullscreenModalVisible(true);
    setIsPlaying(false);
  };

  // Callback when closing the fullscreen modal
  const onCloseFullscreenModal = () => {
    setIsFullscreenModalVisible(false);
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

        {/* Disable the fullscreen button on already fullscreen animations (in modal) */}
        {!fullscreenDisabled && <BiFullscreen className={classes.controlButton} onClick={onOpenFullscreenModal} />}
      </div>
    );
  };

  const renderImagePIP = () => {
    // If there is no pip or it's not an image
    if (!(pip && pip.source.mediaType === 'image')) {
      return null;
    }

    return <SceneVideoPlayerImagePIP currentTime={currentTime} pip={pip} sceneVideoPlayerSize={sceneVideoPlayerSize} />;
  };

  return (
    <>
      <div
        ref={sceneVideoPlayerRef}
        className={classes.sceneVideoPlayerWrapper}
        onMouseEnter={onDisplayControls}
        onMouseLeave={onHideControls}
      >
        <div className={classes.sceneVideoPlayerContainer}>
          {showGrid && <RuleOfThirdsGrid />}
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
              progressInterval={50}
              onDuration={onVideoDurationChange}
              ref={videoPlayerRef}
            />
          </div>

          {lottieAnimation && currentTime <= animationDuration && (
            <div>
              <LottiePlayer
                animationData={lottieAnimation}
                goTo={TimeUtils.fromSecondsToMillis(currentTime)}
                play={isPlaying}
                // The loop is handled by the currentTime state
                loop={false}
                onDurationChange={onAnimationDurationChange}
                className={classes.lottiePlayer}
              />
            </div>
          )}

          {renderImagePIP()}
        </div>

        {controls && renderPlayerControlBar()}
      </div>

      <Modal
        visible={isFullscreenModalVisible}
        onCancel={onCloseFullscreenModal}
        className={classes.fullscreenModal}
        destroyOnClose
        footer={[
          <Button key="cancelModal" onClick={onCloseFullscreenModal}>
            Close
          </Button>,
        ]}
      >
        <div className={classes.videoPlayerContainerInModal}>
          <SceneVideoPlayer
            isSlide={isSlide}
            lottieAnimation={lottieAnimation}
            format={format}
            animationPosition={animationPosition}
            videoUrl={videoUrl}
            fullscreenDisabled
            initialIsPlaying
            controls={controls}
            showGrid={showGrid}
          />
        </div>
      </Modal>
    </>
  );
};

export default SceneVideoPlayer;
