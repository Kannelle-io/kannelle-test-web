import { Alert, Button, message, Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { ANIMATION_KEYS, apiUrl } from "./Constants";
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
    height: playerSize?.height ?? 500,
    width: playerSize?.width ?? 500,
    "& > svg": {
      maxHeight: "100%",
      display: "block",
    },
  }),
  playerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

  const playerRef = useRef<any>();

  const classes = useStyles({ playerSize });

  useEffect(() => {
    setAnimationTexts(
      TextService.getDefaultTextsByAnimationAndTextLength(animation, textLength)
    );
  }, [animation, textLength]);

  useEffect(() => {
    console.log("in effect");
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
      console.log("newPlayerSize", newPlayerSize);
      setPlayerSize(newPlayerSize);
    }
  }, [lottieJson, format, playerRef]);

  useEffect(() => {
    const params = {
      animationName: animation,
      theme,
      format,
      animationTexts: animationTexts,
      position: {
        code: "FULLSCREEN",
        x: 0,
        y: 0,
      },
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
        if (animation === ANIMATION_KEYS.FORD) {
          console.log("lottie", response.data);
        }
      })
      .catch((e) => {
        const errorMsg = `Error with the following params: ${JSON.stringify(
          params,
          null,
          2
        )}
        
          Error: ${e.message}
        `;
        setError(errorMsg);
        console.error(`Error with the following params:`, params);
      })
      .finally(() => setIsLoading(false));
  }, [charterId, token, theme, animation, format, animationTexts]);

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

  return (
    <div className={classes.animationContainer}>
      {animation}
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
    </div>
  );
};

export default AnimationPlayer;
