import React, { ChangeEvent, useState } from 'react';
import './styles.css';
import { createUseStyles } from 'react-jss';
import FontsLoader from './FontsLoader';
import ScenePlayerCard from './ScenePlayerCard';
import 'antd/dist/antd.css';
import { Select, Form, Button, Input } from 'antd';
import { ANIMATION_FORMATS, ANIMATION_KEYS, TEXT_LENGTHS, THEME_KEYS } from './Constants';

const { Option } = Select;

/**
 * 1. Set your charterId
 * 2. Set your API v4 token (dev)
 * 3. Play with the params
 *    - Theme and format
 *    - `animationTexts` in the code
 *    -  `position` (code, x, y) in ScenePlayerCard.tsx
 *    ➡️ The animation will update
 *    ➡️ You can see the generated Lottie file in the console
 *    ➡️ Both the public AND the charter fonts stylesheets are being downloaded and injected
 */

const useStyles = createUseStyles({
  animationsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    width: '50%',
    margin: 'auto',
    marginTop: 20,
  },
  formActions: {
    textAlign: 'left',
  },
});

export default function App() {
  const initToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik0wWTVNa0pEUmpoRk9Ea3pOVU5FT1VVNU16bEVRekUzUmpoQk5UTkRSVEpGTURaRU5VWkJNQSJ9.eyJpc3MiOiJodHRwczovL2tubC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVhYmU2ZDliOTc1NzQwYmY4MmE3NGQ4IiwiYXVkIjoiaHR0cHM6Ly9kZXYucmVzdC5rYW5uZWxsZS5pby92NCIsImlhdCI6MTYyMjgxMTc3NiwiZXhwIjoxNjIyODk4MTc2LCJhenAiOiJGbjFVRURnZHB6OFVBck9HRmhnZFZodUJIbTE5MHZ5WCIsImd0eSI6InBhc3N3b3JkIiwicGVybWlzc2lvbnMiOltdfQ.pNkE3aPggdsfaSQuKI3_hYE-kyGzggIX7TYR7zlVBdeEGumm54XeAuqUNM5y65TJR9P1PuSoYRg4x_YN6XhK8OJM1i6Jj0pMJ7lfRQUGCGPjnb5DDoCg3DJGTYm6_uiyjzRCbgeP6cSr-5JJcEY-twXq2ON97Y7ITAs9m82GvbEsWcTzgNNxp03-haRBpgX8oDu7XyR7aeEc7-u4iH5R3Gc7uLzX0ESi2yn7DLesqATZw2PNqBtUJta62tMCLr70t6cy4v5vRCNBTkSixvB1OfoXIc95r-VdRT6ZbAf4LM2_pVjQPaUGsqmazep0VjflMCsZ8p2A8CerlVElCL3OGw';
  const [token, setToken] = useState<string>(initToken);
  const [selectedTheme, setSelectedTheme] = useState<string>(THEME_KEYS.ALGIERS);
  const [selectedFormat, setSelectedFormat] = useState<string>(ANIMATION_FORMATS.FORMAT_16_9);
  const [selectedTextLength, setSelectedTextLength] = useState<string>(TEXT_LENGTHS.MEDIUM);

  // Try with:
  // charterId = 6784 --> No charter font defined, we use the public fonts
  // charterId = 6857 --> Charter fonts defined and loaded BUT badly rendered
  const charterId = 6857;
  const classes = useStyles();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initialValues = {
    token: initToken,
    theme: THEME_KEYS.ALGIERS,
    format: ANIMATION_FORMATS.FORMAT_16_9,
    textLength: TEXT_LENGTHS.MEDIUM,
  };

  const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToken(value);
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

  const renderForm = () => {
    return (
      <Form {...layout} name="basic" className={classes.form} initialValues={initialValues}>
        <Form.Item label="Token (API v4)" name="token">
          <Input onChange={onTokenChange} />
        </Form.Item>

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
    );
  };

  return (
    <div className="App">
      <FontsLoader charterId={charterId} token={token} />

      {renderForm()}

      <div className={classes.animationsContainer}>
        {Object.values(ANIMATION_KEYS).map((animationKey: string) => {
          // if (
          //   animationKey !== ANIMATION_KEYS.MAZDA &&
          //   animationKey !== ANIMATION_KEYS.FORD
          // ) {
          //   return;
          // }

          return (
            <ScenePlayerCard
              charterId={charterId}
              token={token}
              theme={selectedTheme}
              animation={animationKey}
              format={selectedFormat}
              textLength={selectedTextLength}
              key={animationKey}
            />
          );
        })}
      </div>
    </div>
  );
}
