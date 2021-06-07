import { Alert, Button, Card, message, Modal, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ANIMATION_FORMATS, apiUrl } from './Constants';
import LottiePlayer from './LottiePlayer';
import AnimationService from './utils/AnimationService';
import TextService from './utils/TextService';
import { CodeOutlined, CopyOutlined } from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import ScenePlayer from './ScenePlayer';
import SceneVideoPlayer from './SceneVideoPlayer';
import type { AnimationPosition } from './types/AnimationType';

type Props = {
  charterId: number;
  token: string;
  theme: string;
  animation: string;
  format: string;
  textLength: string;
  showGrid: boolean;
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

const ScenePlayerCard = ({ charterId, token, theme, animation, format, textLength, showGrid }: Props) => {
  const [lottieJson, setLottieJson] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState<string>();
  const [animationTexts, setAnimationTexts] = useState<string[]>();
  const [position, setPosition] = useState<AnimationPosition>({
    code: 'FULLSCREEN',
  });

  const classes = useStyles();

  // Default animation texts for each animation depending on the selected textLength
  useEffect(() => {
    setAnimationTexts(TextService.getDefaultTextsByAnimationAndTextLength(animation, textLength));
  }, [animation, textLength]);

  // Default animation positions
  useEffect(() => {
    setPosition(AnimationService.getDefaultPosition(theme, animation));
  }, [animation, theme]);

  // Fetch the actual Lottie file depending on the animation params
  useEffect(() => {
    if (!(animation && theme && format && position && animationTexts && animationTexts.length > 0)) {
      return;
    }

    const params = {
      animationName: animation,
      theme,
      format,
      animationTexts: animationTexts,
      position,
    };

    setIsLoading(true);
    setError(undefined);

    axios
      .post(`${apiUrl}/charters/${charterId}/animations`, params, {
        timeout: 30000,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setLottieJson(response.data);
      })
      .catch((e) => {
        const status = e.response.status;
        // Expired token
        if (status === 401) {
          const errorMsg = `Error: the token might be expired`;
          setError(errorMsg);
          console.error(errorMsg, e);
          return;
        }

        // General error case
        const errorMsg = `Error with the following params: ${JSON.stringify(params, null, 2)}
        
          Error: ${e.message}
        `;
        setError(errorMsg);
        console.error(`Error with the following params:`, params, e);
      })
      .finally(() => setIsLoading(false));
  }, [charterId, token, theme, animation, format, animationTexts, position]);

  const onOpenModal = () => {
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  // Error panel
  const renderError = () => {
    return <Alert message="Error" description={error} type="error" showIcon className={classes.error} />;
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
        type={'primary'}
        danger={!!error}
        onClick={onOpenModal}
        icon={<CodeOutlined />}
        className={classes.lottieAnimationButton}
        loading={isLoading}
        disabled={isLoading}
      >
        Lottie code
      </Button>
    );
  };

  return (
    <>
      <div className={classes.animationContainer}>
        <Card title={renderAnimationCardTitle()} extra={renderOpenLottieModalButton()}>
          {isLoading && <Skeleton active />}
          {error && !isLoading && renderError()}

          {lottieJson && !error && !isLoading && (
            <ScenePlayer
              animation={animation}
              lottieAnimation={lottieJson}
              format={format}
              animationPosition={position}
              showGrid={showGrid}
            />
          )}
        </Card>
      </div>

      {renderLottieCodeModal()}
    </>
  );
};

export default ScenePlayerCard;
