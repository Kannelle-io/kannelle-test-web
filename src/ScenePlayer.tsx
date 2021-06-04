import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";
import SceneVideoPlayer from "./SceneVideoPlayer";
import AnimationService from "./utils/AnimationService";

type Props = {
  lottieAnimation: string;
  format: string;
};

const useStyles = createUseStyles({
  scenePlayerWrapper: {
    background: "black",
    height: 0,
    paddingBottom: "56.25%", // (1 / ratio) * 100% where ratio = 16/9
    width: "100%",
    position: "relative",
  },
  scenePlayerContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  playerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

const ScenePlayer: FunctionComponent<Props> = ({
  lottieAnimation,
  format,
}: Props) => {
  const classes = useStyles();
  const [playerSize, setPlayerSize] =
    useState<{ height: number; width: number }>();

  const playerRef = useRef<any>();

  useEffect(() => {
    if (playerRef.current) {
      const playerInitialSize = {
        width: playerRef.current.clientWidth,
        height: playerRef.current.clientHeight,
      };
      const newPlayerSize = AnimationService.getAnimationPlayerSize(
        lottieAnimation,
        playerInitialSize,
        format
      );
      setPlayerSize(newPlayerSize);
    }
  }, [lottieAnimation, format, playerRef]);

  return (
    <div className={classes.scenePlayerWrapper}>
      <div className={classes.scenePlayerContainer}>
        <div className={classes.playerContainer} ref={playerRef}>
          <SceneVideoPlayer
            lottieAnimation={lottieAnimation}
            playerSize={playerSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ScenePlayer;
