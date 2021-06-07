import React, { ChangeEvent, useState } from 'react';
import './styles.css';
import { createUseStyles } from 'react-jss';
import FontsLoader from './FontsLoader';
import ScenePlayerCard from './ScenePlayerCard';
import 'antd/dist/antd.css';
import { Select, Form, Button, Input, Checkbox } from 'antd';
import { ANIMATION_FORMATS, ANIMATION_KEYS, TEXT_LENGTHS, THEME_KEYS } from './Constants';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

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
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik0wWTVNa0pEUmpoRk9Ea3pOVU5FT1VVNU16bEVRekUzUmpoQk5UTkRSVEpGTURaRU5VWkJNQSJ9.eyJpc3MiOiJodHRwczovL2tubC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVhYmU2ZDliOTc1NzQwYmY4MmE3NGQ4IiwiYXVkIjoiaHR0cHM6Ly9kZXYucmVzdC5rYW5uZWxsZS5pby92NCIsImlhdCI6MTYyMzA1MTYwMSwiZXhwIjoxNjIzMTM4MDAxLCJhenAiOiJGbjFVRURnZHB6OFVBck9HRmhnZFZodUJIbTE5MHZ5WCIsImd0eSI6InBhc3N3b3JkIiwicGVybWlzc2lvbnMiOltdfQ.K889zAnSaqYIcxhwBOdZvobE84I6t9FcTdZS9nES164cVBvgfnp3G3iLWY4yZNadYwBwVZm7h77ZQQnSTsbR6hO1ozZcNXIzhn6HRUg8i4y-TZkXfHkHXWXlmJ1utAI5ddlT1VJVxvf4qXtPgOkZJeG6rthQzklOL3EDZufw0Lz3q3GhB_JQhP1C3IGzo7I99RFSYTssXEly39mS9u1fRRTM9Q2zQX_wOP6zTP2Y7T0Ba6NYwwAPxOIM7_7-ZEolOrVC9q87f1qTTnZ_iwYXZMx5IQaK_PR6apXrJ2zAj3PWjNegqIdnsE3zFvl33UuhfzQhbs1y1uFfT8VT5Bq8dA';
  const [token, setToken] = useState<string>(initToken);
  const [selectedTheme, setSelectedTheme] = useState<string>(THEME_KEYS.ALGIERS);
  const [selectedFormat, setSelectedFormat] = useState<string>(ANIMATION_FORMATS.FORMAT_16_9);
  const [selectedTextLength, setSelectedTextLength] = useState<string>(TEXT_LENGTHS.MEDIUM);
  const [showGrid, setShowGrid] = useState(true);

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

  const onShowGridChange = (e: CheckboxChangeEvent) => {
    setShowGrid(e.target.checked);
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

        <Form.Item label="Rule of third grid" name="showGrid">
          <Checkbox onChange={onShowGridChange} checked={showGrid} />
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
              showGrid={showGrid}
              key={animationKey}
            />
          );
        })}
      </div>
    </div>
  );
}
