import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import ReactPlayer from "react-player";
import useWindowSize from "./hooks/useWindowSize";
import LottiePlayer from "./LottiePlayer";
import AnimationService from "./utils/AnimationService";

type Props = {
  isSlide: boolean;
  videoUrl?: string;
  lottieAnimation: any;
  format: string;
  // lottiePlayerSize?: {
  //   height: number;
  //   width: number;
  // };
};

type StyleProps = {
  sceneVideoPlayerSize?: {
    height: number;
    width: number;
  };
  lottiePlayerSize?: {
    height: number;
    width: number;
  };
};

const useStyles = createUseStyles({
  sceneVideoPlayerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  sceneVideoPlayerContainer: ({ sceneVideoPlayerSize }: StyleProps) => ({
    height: sceneVideoPlayerSize?.height ?? "100%",
    width: sceneVideoPlayerSize?.width ?? "100%",
    position: "relative",
  }),
  videoContainer: {
    height: "100%",
  },
  lottiePlayerContainer: {},
  lottiePlayer: ({ lottiePlayerSize }: StyleProps) => ({
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    height: lottiePlayerSize?.height ?? "100%",
    width: lottiePlayerSize?.width ?? "100%",
    "& > svg": {
      maxHeight: "100%",
      display: "block",
    },
  }),
});

const SceneVideoPlayer: FunctionComponent<Props> = ({
  isSlide,
  videoUrl,
  lottieAnimation,
  format,
}: // lottiePlayerSize,
Props) => {
  const [sceneVideoPlayerSize, setSceneVideoPlayerSize] =
    useState<{ width: number; height: number }>();
  const [lottiePlayerSize, setLottiePlayerSize] =
    useState<{ width: number; height: number }>();

  const classes = useStyles({ lottiePlayerSize, sceneVideoPlayerSize });
  const sceneVideoPlayerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const windowSize = useWindowSize();

  // From the rendered SceneVideoPlayer, calculate the new LottiePlayer size
  useEffect(() => {
    if (sceneVideoPlayerRef.current) {
      const boundingRect = sceneVideoPlayerRef.current.getBoundingClientRect();
      const playerInitialSize = {
        width: boundingRect.width,
        height: boundingRect.height,
      };

      const videoPlayerSize = AnimationService.getVideoPlayerSizeByFormat(
        format,
        playerInitialSize
      );
      setSceneVideoPlayerSize(videoPlayerSize);

      const newLottiePlayerSize = AnimationService.getAnimationPlayerSize(
        lottieAnimation,
        videoPlayerSize,
        format
      );
      setLottiePlayerSize(newLottiePlayerSize);
    }
  }, [lottieAnimation, format, sceneVideoPlayerRef, windowSize]);

  return (
    <div ref={sceneVideoPlayerRef} className={classes.sceneVideoPlayerWrapper}>
      <div className={classes.sceneVideoPlayerContainer}>
        {!isSlide && videoUrl && (
          <div className={classes.videoContainer}>
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              ref={videoPlayerRef}
            />
          </div>
        )}

        <div className={classes.lottiePlayerContainer}>
          <LottiePlayer
            animationData={lottieAnimation}
            play
            loop
            className={classes.lottiePlayer}
          />
        </div>
      </div>
    </div>
  );
};

export default SceneVideoPlayer;
