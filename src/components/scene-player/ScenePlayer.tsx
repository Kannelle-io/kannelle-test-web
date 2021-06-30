import { Skeleton } from 'antd';
import { CancelTokenSource } from 'axios';
import log from 'loglevel';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/RootState';
import VideoEmpty from '../../resources/videos/video_empty_10.mp4';
import AnimationService from '../../services/AnimationService';
import { APIManager } from '../../services/api/APIManager';
import { fetchAnimationByCharterIdAndParams, getCharterMediaCroppedUrlById } from '../../services/api/ChartersService';
import { APIFetchAnimationByCharterIdParams, MediaFile } from '../../services/api/types/ChartersServiceTypes';
import { AnimationPosition, PIP } from '../../types/AnimationType';
import SceneVideoPlayer from './components/SceneVideoPlayer';

type Props = {
  animationName?: string;
  animationTheme: string;
  animationTexts: string[];
  format: string;
  animationPosition?: AnimationPosition;
  videoMedia?: MediaFile;
  videoUrl?: string;
  pip?: PIP;
  initialIsPlaying?: boolean;
  initialTime?: number;
  controls?: boolean;
  useOriginalSettings?: boolean;
  // specific
  showGrid: boolean;
  onLottieJsonChange: (json: any) => void;
  onLottieLoadingChange: (isLoading: boolean) => void;
  onLottieErrorChange: (err?: string) => void;
};

type StyleProps = {
  isLoading: boolean;
};

const useStyles = createUseStyles({
  scenePlayerWrapper: ({ isLoading }: StyleProps) => ({
    background: !isLoading ? 'black' : 'none',
    height: 0,
    paddingBottom: '56.25%', // (1 / ratio) * 100% where ratio = 16/9
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid #D0D0D0`,
    borderRadius: 5,
  }),
  scenePlayerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const ScenePlayer: FunctionComponent<Props> = ({
  animationName,
  animationTheme,
  animationTexts,
  animationPosition,
  format,
  videoMedia,
  videoUrl,
  pip,
  initialIsPlaying = false,
  initialTime = 0,
  controls = true,
  useOriginalSettings = false,
  // specific
  showGrid,
  onLottieJsonChange,
  onLottieLoadingChange,
  onLottieErrorChange,
}: Props) => {
  const [isLottieLoading, setIsLottieLoading] = useState(true);
  const [isCroppedUrlLoading, setIsCroppedUrlLoading] = useState(true);
  const [isCroppedPipUrlLoading, setIsCroppedPipUrlLoading] = useState(true);
  const [lottieJson, setLottieJson] = useState<string>();
  const [isSlide, setIsSlide] = useState(false);
  const [playerVideoUrl, setPlayerVideoUrl] = useState<string>();
  const [pipUrl, setPipUrl] = useState(pip?.source?.url);
  const [completePip, setCompletePip] = useState<PIP>();

  const isLoading = isLottieLoading || isCroppedUrlLoading || isCroppedPipUrlLoading;

  const classes = useStyles({ isLoading });
  const cancelTokenSourceRef = useRef<CancelTokenSource>(APIManager.getCancelToken());

  const charterId = useSelector((state: RootState) => state.charters.current?.id);

  // Check if the animation is a Slide
  useEffect(() => {
    if (!animationName) {
      setIsSlide(false);
      return;
    }
    setIsSlide(AnimationService.isSlideAnimation(animationName));
  }, [animationName]);

  // Enhance the PIP by adding the cropped file url
  useEffect(() => {
    if (pip) {
      setCompletePip({ ...pip, source: { ...pip.source, croppedFileUrl: pipUrl } });
    }
  }, [pip, pipUrl]);

  // If there is a croppedArea on the media, fetch the url of the cropped file
  useEffect(() => {
    if (!(charterId && videoMedia && videoMedia.croppedArea)) {
      setPlayerVideoUrl(videoMedia?.url ?? videoUrl);
      setIsCroppedUrlLoading(false);
      return;
    }

    setIsCroppedUrlLoading(true);
    const cancelTokenSource = cancelTokenSourceRef.current;

    getCharterMediaCroppedUrlById(charterId, videoMedia.id, videoMedia.croppedArea, cancelTokenSource)
      .then((responseMedia) => {
        setPlayerVideoUrl(responseMedia.croppedFileUrl);
      })
      .catch((e) => {
        log.debug('Error while fetching the cropped media url', e);
      })
      .finally(() => {
        setIsCroppedUrlLoading(false);
      });
  }, [videoMedia, videoUrl]);

  // If there is a PIP, fetch the url of the cropped PIP media
  useEffect(() => {
    if (!(charterId && pip && pip.source && pip.source.croppedArea)) {
      setIsCroppedPipUrlLoading(false);
      return;
    }

    setIsCroppedPipUrlLoading(true);
    const cancelTokenSource = cancelTokenSourceRef.current;

    getCharterMediaCroppedUrlById(charterId, pip.source.id, pip.source.croppedArea, cancelTokenSource)
      .then((responseMedia) => {
        setPipUrl(responseMedia.croppedFileUrl);
      })
      .catch((e) => {
        log.debug('Error while fetching the cropped PIP media url', e);
      })
      .finally(() => {
        setIsCroppedPipUrlLoading(false);
      });
  }, [pip]);

  // Fetch the Lottie JSON file based on some params
  useEffect(() => {
    onLottieErrorChange(undefined);
    if (
      !(
        charterId &&
        animationName &&
        animationPosition &&
        animationTheme &&
        format &&
        animationTexts &&
        animationTexts.length > 0
      )
    ) {
      setIsLottieLoading(false);
      return;
    }

    setIsLottieLoading(true);
    const cancelTokenSource = cancelTokenSourceRef.current;
    const params: APIFetchAnimationByCharterIdParams = {
      animationName,
      theme: animationTheme,
      format,
      animationTexts,
      duration: !isSlide && videoMedia ? videoMedia.duration : undefined, // Use the video duration for Recordable
      position: {
        code: animationPosition.code,
        x: animationPosition.x,
        y: animationPosition.y,
      },
      useOriginalSettings,
    };

    fetchAnimationByCharterIdAndParams(charterId, params, cancelTokenSource)
      .then((response) => {
        setLottieJson(response.data);
        onLottieJsonChange(response.data);
      })
      .catch((e) => {
        const msg = `Error with the following params: ${JSON.stringify(params, null, 2)}`;
        log.debug(msg, e);
        onLottieErrorChange(msg);
      })
      .finally(() => {
        setIsLottieLoading(false);
      });
  }, [
    charterId,
    animationName,
    animationTheme,
    format,
    animationTexts,
    animationPosition,
    isSlide,
    videoMedia,
    useOriginalSettings,
  ]);

  useEffect(() => {
    onLottieLoadingChange(isLoading);
  }, [isLoading]);

  const LoadingSkeleton = () => (
    <>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </>
  );

  return (
    <>
      <div className={classes.scenePlayerWrapper}>
        <div className={classes.scenePlayerContainer}>
          {isLoading && <LoadingSkeleton />}

          {!isLoading && (
            <SceneVideoPlayer
              isSlide={isSlide}
              videoUrl={playerVideoUrl ?? VideoEmpty}
              lottieAnimation={lottieJson}
              format={format}
              animationPosition={animationPosition}
              pip={completePip ?? undefined}
              initialIsPlaying={initialIsPlaying}
              initialTime={initialTime}
              controls={controls}
              showGrid={showGrid}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ScenePlayer;
