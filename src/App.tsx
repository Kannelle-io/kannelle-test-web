import React, { useState } from "react";
import "./styles.css";
import { createUseStyles } from "react-jss";
import FontsLoader from "./FontsLoader";
import AnimationPlayer from "./AnimationPlayer";
import "antd/dist/antd.css";
import { Select, Form, Button } from "antd";

import {
  ANIMATION_FORMATS,
  ANIMATION_KEYS,
  TEXT_LENGTHS,
  THEME_KEYS,
} from "./Constants";

const { Option } = Select;

/**
 * 1. Set your charterId
 * 2. Set your API v4 token (dev)
 * 3. Play with the params
 *    - Theme and format
 *    - `animationTexts` in the code
 *    -  `position` (code, x, y) in AnimationPlayer.tsx
 *    ➡️ The animation will update
 *    ➡️ You can see the generated Lottie file in the console
 *    ➡️ Both the public AND the charter fonts stylesheets are being downloaded and injected
 */

const useStyles = createUseStyles({
  animationsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    width: "50%",
    margin: "auto",
    marginTop: 20,
  },
  formActions: {
    textAlign: "left",
  },
});

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<string>(
    THEME_KEYS.ALGIERS
  );
  const [selectedFormat, setSelectedFormat] = useState<string>(
    ANIMATION_FORMATS.FORMAT_16_9
  );
  const [selectedTextLength, setSelectedTextLength] = useState<string>(
    TEXT_LENGTHS.LARGE
  );

  const [form] = Form.useForm();

  // Try with:
  // charterId = 6784 --> No charter font defined, we use the public fonts
  // charterId = 6857 --> Charter fonts defined and loaded BUT badly rendered
  const charterId = 6857;
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik0wWTVNa0pEUmpoRk9Ea3pOVU5FT1VVNU16bEVRekUzUmpoQk5UTkRSVEpGTURaRU5VWkJNQSJ9.eyJpc3MiOiJodHRwczovL2tubC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVhYmU2ZDliOTc1NzQwYmY4MmE3NGQ4IiwiYXVkIjoiaHR0cHM6Ly9kZXYucmVzdC5rYW5uZWxsZS5pby92NCIsImlhdCI6MTYyMjYzNTM5MSwiZXhwIjoxNjIyNzIxNzkxLCJhenAiOiJGbjFVRURnZHB6OFVBck9HRmhnZFZodUJIbTE5MHZ5WCIsImd0eSI6InBhc3N3b3JkIiwicGVybWlzc2lvbnMiOltdfQ.l8_9Fvnh5jMiYDwhfyz7H6jLx1iPSa5Li-jh_wH2Xjm--JiIn1ewKo91colJYLt4O0A-QIZCmy_hpwEfasuTnRhEAZ3o-awaOzSNkDeV8CNSgKal9ruAxdZdI8_aQS71DrHIkm8HtaT45PQkZKPy1B-S0vqLy8F29Pfn6Gyr2s7woXA5cS6IoSLqsKPMoWNTVQqssLPvDQvgOhA6JTiXOu96JmibKlhruJ4scqL-M0hqftzQ7irUACQh-iPl19DvcrM_HHob_lShQB2p5D5agCMOeqL81BvAwomIV0A8IdTlPi1lSFahXs7ax-cSYhgDgjMIr5Dor7MvXCJ-4puIHA";

  const classes = useStyles();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initialValues = {
    theme: THEME_KEYS.ALGIERS,
    format: ANIMATION_FORMATS.FORMAT_16_9,
    textLength: TEXT_LENGTHS.LARGE,
  };

  const onThemeChange = (value: string) => {
    setSelectedTheme(value);
  };

  const onFormatChange = (value: string) => {
    setSelectedFormat(value);
  };

  const onTextLengthChange = (value: string) => {
    setSelectedTextLength(value);
  };

  return (
    <div className="App">
      <FontsLoader charterId={charterId} token={token} />

      <Form
        {...layout}
        name="basic"
        className={classes.form}
        initialValues={initialValues}
      >
        <Form.Item label="Theme" name="theme">
          <Select onChange={onThemeChange} value={selectedTheme}>
            {Object.values(THEME_KEYS).map((themeKey: string) => (
              <Option key={themeKey} value={themeKey}>
                {themeKey}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Format" name="format">
          <Select onChange={onFormatChange} value={selectedFormat}>
            {Object.values(ANIMATION_FORMATS).map((formatKey: string) => (
              <Option key={formatKey} value={formatKey}>
                {formatKey}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Text length" name="textLength">
          <Select onChange={onTextLengthChange} value={selectedTextLength}>
            {Object.values(TEXT_LENGTHS).map((textLength: string) => (
              <Option key={textLength} value={textLength}>
                {textLength}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <div className={classes.animationsContainer}>
        {Object.values(ANIMATION_KEYS).map((animationKey: string) => (
          <AnimationPlayer
            charterId={charterId}
            token={token}
            theme={selectedTheme}
            animation={animationKey}
            format={selectedFormat}
            textLength={selectedTextLength}
            key={animationKey}
          />
        ))}
        {/* <AnimationPlayer
          charterId={charterId}
          token={token}
          theme={selectedTheme}
          animation="FORD"
          format={selectedFormat}
          animationTexts={animationTexts}
          // key={animationKey}
        /> */}
      </div>
    </div>
  );
}
