import { Alert, Button, Card, message, Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { ANIMATION_FORMATS, apiUrl } from "./Constants";
import LottiePlayer from "./LottiePlayer";
import AnimationService from "./utils/AnimationService";
import TextService from "./utils/TextService";
import { CodeOutlined, CopyOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
  charterId: number;
  token: string;
  theme: string;
  animation: string;
  format: string;
  textLength: string;
};

type StyleProps = {
  playerSize: {
    height: number;
    width: number;
  };
  format: string;
};

const useStyles = createUseStyles({
  animationContainer: {
    width: "70%",
    display: "block",
    marginBottom: 40,
    marginTop: 10,
    boxShadow: "0 8px 8px 0 hsla(0, 0%, 0%, 0.15) !important",
  },
  lottiePlayer: ({ playerSize }: StyleProps) => ({
    maxHeight: "100%",
    height: playerSize?.height ?? "100%",
    width: playerSize?.width ?? "100%",
    "& > svg": {
      maxHeight: "100%",
      display: "block",
    },
  }),
  playerContainer: ({ format }: StyleProps) => {
    const height =
      format === ANIMATION_FORMATS.FORMAT_9_16 ||
      format === ANIMATION_FORMATS.FORMAT_1_1
        ? 400
        : undefined;

    const width =
      format === ANIMATION_FORMATS.FORMAT_16_9 ||
      format === ANIMATION_FORMATS.FORMAT_1_1
        ? 400
        : undefined;

    return {
      marginTop: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height,
      width,

      // To center it
      margin: "auto",
    };
  },
  error: {
    textAlign: "left",
  },
  lottieAnimationButton: {
    marginLeft: 15,
  },
  lottieFile: {
    fontSize: 10,
    background: "#6b6b6b",
    color: "white",
  },
  copyToClipboardButton: {
    marginBottom: 20,
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
  },
  positionDescriptor: {
    marginLeft: 15,
    padding: ".2em .4em",
    margin: "0",
    fontSize: "60%",
    backgroundColor: "rgba(27,31,35,.05)",
    borderRadius: "3px",
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace",
    width: "fit-content",
  },
});

const AnimationPlayer = ({
  charterId,
  token,
  theme,
  animation,
  format,
  textLength,
}: Props) => {
  const [lottieJson, setLottieJson] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState<string>();
  const [playerSize, setPlayerSize] = useState<any>();
  const [animationTexts, setAnimationTexts] = useState<string[]>();
  const [position, setPosition] =
    useState<{ code: string; x?: number; y?: number }>();

  const playerRef = useRef<any>();

  console.log(`animation: ${animation}, playerSize:`, playerSize);

  const classes = useStyles({ playerSize, format });

  useEffect(() => {
    setAnimationTexts(
      TextService.getDefaultTextsByAnimationAndTextLength(animation, textLength)
    );
  }, [animation, textLength]);

  useEffect(() => {
    setPosition(AnimationService.getDefaultPosition(theme, animation));
  }, [animation, theme]);

  useEffect(() => {
    if (playerRef.current) {
      const playerInitialSize = {
        width: playerRef.current.clientWidth,
        height: playerRef.current.clientHeight,
      };
      const newPlayerSize = AnimationService.getAnimationPlayerSize(
        lottieJson,
        playerInitialSize,
        format
      );
      setPlayerSize(newPlayerSize);
    }
  }, [lottieJson, format, playerRef]);

  useEffect(() => {
    if (
      !(
        animation &&
        theme &&
        format &&
        position &&
        animationTexts &&
        animationTexts.length > 0
      )
    ) {
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
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setLottieJson(response.data);
      })
      .catch((e) => {
        const status = e.response.status;
        if (status === 401) {
          const errorMsg = `Error: the token might be expired`;
          setError(errorMsg);
          console.error(errorMsg, e);
          return;
        }

        const errorMsg = `Error with the following params: ${JSON.stringify(
          params,
          null,
          2
        )}
        
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

  const renderError = () => {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className={classes.error}
      />
    );
  };

  const renderLottieCodeModal = () => {
    return (
      <Modal
        title={animation}
        visible={isModalVisible}
        onOk={onCloseModal}
        onCancel={onCloseModal}
      >
        {lottieJson && (
          <CopyToClipboard
            text={JSON.stringify(lottieJson, null, 2)}
            onCopy={(): void => {
              message.info("JSON copied to clipboard");
            }}
          >
            <Button
              icon={<CopyOutlined />}
              type="ghost"
              className={classes.copyToClipboardButton}
            >
              Copy to clipboard
            </Button>
          </CopyToClipboard>
        )}

        <pre className={classes.lottieFile}>
          {JSON.stringify(lottieJson, null, 2)}
        </pre>
      </Modal>
    );
  };

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

  return (
    <>
      <div className={classes.animationContainer}>
        <Card
          title={renderAnimationCardTitle()}
          extra={
            <Button
              type={"primary"}
              danger={!!error}
              onClick={onOpenModal}
              icon={<CodeOutlined />}
              className={classes.lottieAnimationButton}
              loading={isLoading}
              disabled={isLoading}
            >
              Lottie code
            </Button>
          }
        >
          {isLoading && <Skeleton active />}
          {error && !isLoading && renderError()}
          {lottieJson && !error && !isLoading && (
            <div ref={playerRef} className={classes.playerContainer}>
              <LottiePlayer
                animationData={lottieJson}
                play
                loop
                className={classes.lottiePlayer}
              />
            </div>
          )}
        </Card>
      </div>

      {renderLottieCodeModal()}
    </>
  );
};

export default AnimationPlayer;
