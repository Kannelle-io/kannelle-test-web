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
import useWindowSize from "./hooks/useWindowSize";

type Props = {
  animation: string;
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
});

const ScenePlayer: FunctionComponent<Props> = ({
  animation,
  lottieAnimation,
  format,
}: Props) => {
  const classes = useStyles();
  const [isSlide, setIsSlide] = useState(false);
  // For the demo
  const [sampleVideo, setSampleVideo] = useState<string>();

  useEffect(() => {
    setIsSlide(AnimationService.isSlideAnimation(animation));
  }, [animation]);

  // For the demo
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
        />
      </div>
    </div>
  );
};

export default ScenePlayer;
