import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import AnimationService from '../../../services/AnimationService';
import { PIP, Size } from '../../../types/AnimationType';

type Props = {
  currentTime: number;
  pip?: PIP;
  sceneVideoPlayerSize?: Size;
};

type StyleProps = {
  sceneVideoPlayerSize?: Size;
};

const useStyles = createUseStyles({
  pipImageContainer: ({ sceneVideoPlayerSize }: StyleProps) => ({
    height: sceneVideoPlayerSize?.height ?? '100%',
    width: sceneVideoPlayerSize?.width ?? '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
  pipImage: {
    height: '100%',
    width: '100%',
  },
});

const SceneVideoPlayerImagePIP: FunctionComponent<Props> = ({ currentTime, pip, sceneVideoPlayerSize }: Props) => {
  const classes = useStyles({ sceneVideoPlayerSize });

  // If there is no pip or it's not an image or if the player size is not defined
  if (!(pip && pip.source.mediaType === 'image' && sceneVideoPlayerSize)) {
    return null;
  }

  // Check if the pip image must be displayed depending on the currentTime, its startAt and its duration
  const isPipStarted = currentTime >= pip.startAt;
  const isPipEnded = currentTime > pip.startAt + pip.duration;
  if (!(isPipStarted && !isPipEnded)) {
    return null;
  }

  const imageStyle = AnimationService.computeImagePipEffectStyle(currentTime, pip, sceneVideoPlayerSize);

  return (
    <div className={classes.pipImageContainer}>
      <img
        className={classes.pipImage}
        src={pip.source.croppedFileUrl ?? pip.source.url}
        alt="PiP img"
        style={imageStyle ? { ...imageStyle } : undefined}
      />
    </div>
  );
};

export default SceneVideoPlayerImagePIP;
