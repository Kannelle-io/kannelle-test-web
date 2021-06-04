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
  lottiePlayerSize?: {
    height: number;
    width: number;
  };
  videoPlayerSize?: {
    height: number;
    width: number;
  };
};

const useStyles = createUseStyles({
  sceneVideoPlayerContainer: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  videoContainer: {
    height: "100%",
  },
  lottiePlayer: ({ lottiePlayerSize }: StyleProps) => ({
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
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
  const [videoPlayerSize, setVideoPlayerSize] =
    useState<{ width: number; height: number }>();
  const [lottiePlayerSize, setLottiePlayerSize] =
    useState<{ width: number; height: number }>();

  const classes = useStyles({ lottiePlayerSize, videoPlayerSize });
  const sceneVideoPlayerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const windowSize = useWindowSize();

  // From the rendered SceneVideoPlayer, calculate the new LottiePlayer size
  useEffect(() => {
    if (sceneVideoPlayerRef.current) {
      const playerInitialSize = {
        width: sceneVideoPlayerRef.current.clientWidth,
        height: sceneVideoPlayerRef.current.clientHeight,
      };
      const newLottiePlayerSize = AnimationService.getAnimationPlayerSize(
        lottieAnimation,
        playerInitialSize,
        format
      );
      setLottiePlayerSize(newLottiePlayerSize);
    }
  }, [lottieAnimation, format, sceneVideoPlayerRef, windowSize]);

  return (
    <div
      className={classes.sceneVideoPlayerContainer}
      ref={sceneVideoPlayerRef}
    >
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

      <div>
        <LottiePlayer
          animationData={lottieAnimation}
          play
          loop
          className={classes.lottiePlayer}
        />
      </div>
    </div>
  );
};

export default SceneVideoPlayer;
