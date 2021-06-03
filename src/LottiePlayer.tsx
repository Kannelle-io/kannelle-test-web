// Adaptation of `react-lottie-player` (from v1.3.1)

import isEqual from "lodash/isEqual";
import lottie, { AnimationConfig } from "lottie-web";
import React, {
  FunctionComponent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  animationData?: any;
  path?: string;
  play?: boolean;
  goTo?: number;
  speed?: number;
  direction?: number;
  loop?: number | boolean;
  segments?: number[] | boolean;
  rendererSettings?: any;
  renderer?: AnimationConfig["renderer"];
  // audioFactory?: any;
  onLoad?: () => void;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: () => void;
  onSegmentStart?: () => void;
  style?: React.CSSProperties;
  // Custom
  goToByFrame?: boolean;
  className?: string;
};

const LottiePlayer: FunctionComponent<Props> = memo(
  ({
    animationData = null,
    path,
    play = false,
    speed = 1,
    direction = 1,
    segments: segmentsIn,
    goTo = undefined,
    renderer = "svg",
    loop = true,
    rendererSettings: rendererSettingsIn = {},
    // audioFactory = null,
    onLoad = () => {},
    onComplete = () => {},
    onLoopComplete = () => {},
    onEnterFrame = () => {},
    onSegmentStart = () => {},
    goToByFrame = false,
    ...props
  }: Props) => {
    const animElementRef = useRef<any>();
    const animRef = useRef<any>();

    const [ready, setReady] = useState(false);

    const [segments, setSegments] = useState(segmentsIn);

    // Prevent re-init
    useEffect(() => {
      if (!isEqual(segments, segmentsIn)) setSegments(segmentsIn);
    }, [segmentsIn, segments]);

    const [rendererSettings, setRendererSettings] =
      useState(rendererSettingsIn);

    // Prevent re-init
    useEffect(() => {
      if (!isEqual(rendererSettings, rendererSettingsIn))
        setRendererSettings(rendererSettingsIn);
    }, [rendererSettingsIn, rendererSettings]);

    // In order to remove listeners before animRef gets destroyed:
    useEffect(
      () => () => animRef.current.removeEventListener("complete", onComplete),
      [onComplete]
    );
    useEffect(
      () => () =>
        animRef.current.removeEventListener("loopComplete", onLoopComplete),
      [onLoopComplete]
    );
    useEffect(
      () => () =>
        animRef.current.removeEventListener("enterFrame", onEnterFrame),
      [onEnterFrame]
    );
    useEffect(
      () => () =>
        animRef.current.removeEventListener("segmentStart", onSegmentStart),
      [onSegmentStart]
    );

    useEffect(() => {
      animRef.current = lottie.loadAnimation({
        animationData,
        path,
        container: animElementRef.current,
        renderer,
        loop: false,
        autoplay: false, // We want to explicitly control playback
        rendererSettings,
        // audioFactory,
      });

      function onDomLoaded() {
        setReady(true);
        if (onLoad) {
          onLoad();
        }
      }
      animRef.current.addEventListener("DOMLoaded", onDomLoaded);

      return () => {
        animRef.current.removeEventListener("DOMLoaded", onDomLoaded);
        setReady(false);
        animRef.current.destroy();
        animRef.current = undefined;
      };
    }, [loop, renderer, rendererSettings, animationData, path]); // audioFactory]);

    useEffect(() => {
      animRef.current.addEventListener("complete", onComplete);
    }, [onComplete]);

    useEffect(() => {
      animRef.current.addEventListener("loopComplete", onLoopComplete);
    }, [onLoopComplete]);

    useEffect(() => {
      animRef.current.addEventListener("enterFrame", onEnterFrame);
    }, [onEnterFrame]);

    useEffect(() => {
      animRef.current.addEventListener("segmentStart", onSegmentStart);
    }, [onSegmentStart]);

    useEffect(() => {
      if (!(ready && animRef.current)) return;
      animRef.current.loop = loop;
    }, [ready, loop]);

    const wasPlayingSegmentsRef = useRef(false);

    useEffect(() => {
      if (!(ready && animRef.current)) return;

      // Without this code, when playback restarts, it will not play in reverse:
      // https://github.com/mifi/react-lottie-player/issues/19
      function playReverse(lastFrame: number) {
        animRef.current.goToAndPlay(lastFrame, true);
        animRef.current.setDirection(direction);
      }

      if (play === true) {
        const force = true;
        if (segments) {
          animRef.current.playSegments(segments, force);
          wasPlayingSegmentsRef.current = true;

          // This needs to be called after playSegments or it will not play backwards
          if (direction === -1 && Array.isArray(segments)) {
            // TODO What if more than one segment
            const lastFrame = segments[1];
            playReverse(lastFrame);
          }
        } else {
          // If we called playSegments last time, the segments are stored as a state in the lottie object
          // Need to reset segments or else it will still play the old segments also when calling play()
          // wasPlayingSegmentsRef: Only reset segments if playSegments last time, because resetSegments will also reset playback position
          // https://github.com/airbnb/lottie-web/blob/master/index.d.ts
          if (wasPlayingSegmentsRef.current)
            animRef.current.resetSegments(force);
          wasPlayingSegmentsRef.current = false;

          if (direction === -1) {
            const lastFrame = animRef.current.getDuration(true);
            playReverse(lastFrame);
          } else {
            animRef.current.play();
          }
        }
      } else if (play === false) {
        animRef.current.pause();
      }
    }, [play, segments, ready]);

    useEffect(() => {
      if (!(ready && animRef.current)) return;
      if (Number.isNaN(speed)) return;
      animRef.current.setSpeed(speed);
    }, [speed, ready]);

    // This handles the case where only direction has changed (direction is not a dependency of the other effect that calls setDirection)
    useEffect(() => {
      if (!(ready && animRef.current)) return;
      animRef.current.setDirection(direction);
    }, [direction, ready]);

    useEffect(() => {
      if (!(ready && animRef.current)) return;
      if (!goTo) return;
      if (play) animRef.current.goToAndPlay(goTo, goToByFrame);
      else animRef.current.goToAndStop(goTo, goToByFrame);
    }, [goTo, play, ready]);

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={animElementRef}
      />
    );
  }
);

export default LottiePlayer;
