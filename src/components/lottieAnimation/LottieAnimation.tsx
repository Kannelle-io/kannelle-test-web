import { Checkbox, Form, Select } from 'antd';
import 'antd/dist/antd.css';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useContext, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ReactReduxContext } from 'react-redux';
import { ANIMATION_FORMATS, ANIMATION_KEYS, CHARTER_ID, TEXT_LENGTHS, THEME_KEYS } from '../../Constants';
import FontsLoader from '../fontsLoader/FontsLoader';
import ScenePlayerCard from '../scenePlayer/components/ScenePlayerCard';

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

export const LottieAnimation = () => {
  const { store } = useContext(ReactReduxContext);

  const initToken = store.getState().app.apiToken;
  const [token] = useState<string>(initToken);
  const [selectedTheme, setSelectedTheme] = useState<string>(THEME_KEYS.ALGIERS);
  const [selectedCharter, setSelectedCharter] = useState<string>(CHARTER_ID.NO_CHARTER);
  const [selectedFormat, setSelectedFormat] = useState<string>(ANIMATION_FORMATS.FORMAT_16_9);
  const [selectedTextLength, setSelectedTextLength] = useState<string>(TEXT_LENGTHS.MEDIUM);
  const [showGrid, setShowGrid] = useState(true);

  // Try with:
  // charterId = 6784 --> No charter font defined, we use the public fonts
  // charterId = 6857 --> Charter fonts defined and loaded BUT badly rendered
  // const charterId = 6784;
  const classes = useStyles();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initialValues = {
    token: initToken,
    charterId: CHARTER_ID.NO_CHARTER,
    theme: THEME_KEYS.ALGIERS,
    format: ANIMATION_FORMATS.FORMAT_16_9,
    textLength: TEXT_LENGTHS.MEDIUM,
  };

  const onCharterChange = (value: string) => {
    setSelectedCharter(value);
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
        <Form.Item label="CharterId" name="charterId">
          <Select onChange={onCharterChange} value={selectedCharter}>
            {Object.values(CHARTER_ID).map((charterKey: string) => (
              <Option key={charterKey} value={charterKey}>
                {charterKey}
              </Option>
            ))}
          </Select>
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
      <FontsLoader charterId={Number(selectedCharter)} token={token} />

      {renderForm()}

      <div className={classes.animationsContainer}>
        {Object.values(ANIMATION_KEYS).map((animationKey: string) => {
          // if (animationKey !== ANIMATION_KEYS.MAZDA && animationKey !== ANIMATION_KEYS.FORD) {
          //   return;
          // }

          return (
            <ScenePlayerCard
              charterId={Number(selectedCharter)}
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
};

export default LottieAnimation;
