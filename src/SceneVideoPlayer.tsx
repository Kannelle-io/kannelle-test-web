import React, { FunctionComponent } from "react";
import { createUseStyles } from "react-jss";
import LottiePlayer from "./LottiePlayer";

type Props = {
  lottieAnimation: any;
  playerSize?: {
    height: number;
    width: number;
  };
};

type StyleProps = {
  playerSize?: {
    height: number;
    width: number;
  };
};

const useStyles = createUseStyles({
  lottiePlayer: ({ playerSize }: StyleProps) => ({
    maxHeight: "100%",
    maxWidth: "100%",
    height: playerSize?.height ?? "100%",
    width: playerSize?.width ?? "100%",
    "& > svg": {
      maxHeight: "100%",
      display: "block",
    },
  }),
});

const SceneVideoPlayer: FunctionComponent<Props> = ({
  lottieAnimation,
  playerSize,
}: Props) => {
  const classes = useStyles({ playerSize });

  return (
    <LottiePlayer
      animationData={lottieAnimation}
      play
      loop
      className={classes.lottiePlayer}
    />
  );
};

export default SceneVideoPlayer;
