import { CodeOutlined, CopyOutlined } from '@ant-design/icons';
import { Alert, Button, Card, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { createUseStyles } from 'react-jss';
import AnimationService from '../../../services/AnimationService';
import type { AnimationPosition } from '../../../types/AnimationType';
import TextService from '../../../utils/TextService';
import ScenePlayer from '../ScenePlayer';

type Props = {
  theme: string;
  animation: string;
  format: string;
  textLength: string;
  showGrid: boolean;
  useOriginalSettings: boolean;
};

const useStyles = createUseStyles({
  animationContainer: {
    width: '70%',
    display: 'block',
    marginBottom: 40,
    marginTop: 10,
    boxShadow: '0 8px 8px 0 hsla(0, 0%, 0%, 0.15) !important',
  },
  error: {
    textAlign: 'left',
  },
  lottieAnimationButton: {
    marginLeft: 15,
  },
  lottieFile: {
    fontSize: 10,
    background: '#6b6b6b',
    color: 'white',
  },
  copyToClipboardButton: {
    marginBottom: 20,
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  positionDescriptor: {
    marginLeft: 15,
    padding: '.2em .4em',
    margin: '0',
    fontSize: '60%',
    backgroundColor: 'rgba(27,31,35,.05)',
    borderRadius: '3px',
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
    width: 'fit-content',
  },
});

const ScenePlayerCard = ({ theme, animation, format, textLength, showGrid, useOriginalSettings }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [animationTexts, setAnimationTexts] = useState<string[]>();
  const [position, setPosition] = useState<AnimationPosition>({
    code: 'FULLSCREEN',
  });
  const [isSlide, setIsSlide] = useState(false);
  // For the Knl-test
  const [lottieJson, setLottieJson] = useState<any>();
  const [isLottieJsonLoading, setIsLottieJsonLoading] = useState<boolean>(false);
  const [lottieJsonError, setLottieJsonError] = useState<string>();
  // For the demo
  const [sampleVideo, setSampleVideo] = useState<string>();

  const classes = useStyles();

  // Default animation texts for each animation depending on the selected textLength
  useEffect(() => {
    setAnimationTexts(TextService.getDefaultTextsByAnimationAndTextLength(animation, textLength));
  }, [animation, textLength]);

  // Default animation positions
  useEffect(() => {
    setPosition(AnimationService.getDefaultPosition(theme, animation));
  }, [animation, theme]);

  // Check if the animation is a Slide
  useEffect(() => {
    setIsSlide(AnimationService.isSlideAnimation(animation));
  }, [animation]);

  // For the demo: select a sample video of the right format if the video is a Slide
  useEffect(() => {
    if (isSlide) {
      setSampleVideo(undefined);
      return;
    }

    setSampleVideo(AnimationService.getSampleVideoByFormat(format));
  }, [isSlide, format]);

  const onOpenModal = () => {
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const onLottieJsonChange = (json: any) => {
    setLottieJson(json);
  };

  const onLottieLoadingChange = (isLoading: boolean) => {
    setIsLottieJsonLoading(isLoading);
  };

  const onLottieErrorChange = (err?: string) => {
    setLottieJsonError(err);
  };

  // Error panel
  const renderError = () => {
    return (
      <Alert
        message="Error"
        description={<pre>{lottieJsonError}</pre>}
        type="error"
        showIcon
        className={classes.error}
      />
    );
  };

  // Modal to display the Lottie JSON code and copy it to clipboard
  const renderLottieCodeModal = () => {
    return (
      <Modal title={animation} visible={isModalVisible} onOk={onCloseModal} onCancel={onCloseModal}>
        {lottieJson && (
          <CopyToClipboard
            text={JSON.stringify(lottieJson, null, 2)}
            onCopy={(): void => {
              message.info('JSON copied to clipboard');
            }}
          >
            <Button icon={<CopyOutlined />} type="ghost" className={classes.copyToClipboardButton}>
              Copy to clipboard
            </Button>
          </CopyToClipboard>
        )}

        <pre className={classes.lottieFile}>{JSON.stringify(lottieJson, null, 2)}</pre>
      </Modal>
    );
  };

  // Card title
  const renderAnimationCardTitle = () => {
    return (
      <div className={classes.cardTitle}>
        {animation}
        {position && (
          <span className={classes.positionDescriptor}>
            {`(position = { code: ${position.code}, x: ${position.x}, y: ${position.y} })`}
          </span>
        )}
      </div>
    );
  };

  // Button to open the Lottie modal
  const renderOpenLottieModalButton = () => {
    return (
      <Button
        type="primary"
        danger={lottieJsonError !== undefined}
        onClick={!lottieJsonError ? onOpenModal : undefined}
        icon={<CodeOutlined />}
        className={classes.lottieAnimationButton}
        loading={isLottieJsonLoading && !lottieJsonError}
        disabled={isLottieJsonLoading && !lottieJsonError}
      >
        Lottie code
      </Button>
    );
  };

  return (
    <>
      <div className={classes.animationContainer}>
        <Card title={renderAnimationCardTitle()} extra={renderOpenLottieModalButton()}>
          {lottieJsonError && renderError()}

          {!lottieJsonError && (
            <ScenePlayer
              animationTheme={theme}
              animationName={animation}
              animationTexts={animationTexts ?? []}
              animationPosition={position}
              format={format}
              showGrid={showGrid}
              videoUrl={!isSlide ? sampleVideo : undefined}
              useOriginalSettings={useOriginalSettings}
              onLottieJsonChange={onLottieJsonChange}
              onLottieLoadingChange={onLottieLoadingChange}
              onLottieErrorChange={onLottieErrorChange}
            />
          )}
        </Card>
      </div>

      {renderLottieCodeModal()}
    </>
  );
};

export default ScenePlayerCard;
