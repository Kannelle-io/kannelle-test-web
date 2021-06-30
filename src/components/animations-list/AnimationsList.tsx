import { Checkbox, Form, Select } from 'antd';
import 'antd/dist/antd.css';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { ANIMATION_FORMATS, ANIMATION_KEYS, TEXT_LENGTHS, THEME_KEYS } from '../../Constants';
import Company from '../../model/Company';
import { selectCharter } from '../../redux/action/ChartersAction';
import { RootState } from '../../redux/RootState';
import { APIModelCharter } from '../../services/api/types/ChartersServiceTypes';
import ChartersUtils from '../../utils/ChartersUtils';
import CompaniesUtils from '../../utils/CompaniesUtils';
import FontsLoader from '../fonts-loader/FontsLoader';
import Preformatted from '../preformatted/Preformatted';
import ScenePlayerCard from '../scene-player/components/ScenePlayerCard';

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
  companyName: {
    marginRight: 10,
    background: '#1990FF',
    color: 'white',
  },
});

const AnimationsList = () => {
  const token = useSelector((state: RootState) => state.app.apiToken);
  const companies = useSelector((state: RootState) => state.companies.list);
  const charters = useSelector((state: RootState) => state.charters.list);

  const allCharters = useMemo(() => {
    let res: APIModelCharter[] = [];
    companies?.forEach((c: Company) => {
      res = res.concat(c.charters);
    });
    return res;
  }, [companies]);

  const [selectedTheme, setSelectedTheme] = useState<string>(THEME_KEYS.ALGIERS);
  const [selectedCharterId, setSelectedCharterId] = useState<number>();
  const [selectedFormat, setSelectedFormat] = useState<string>(ANIMATION_FORMATS.FORMAT_16_9);
  const [selectedTextLength, setSelectedTextLength] = useState<string>(TEXT_LENGTHS.MEDIUM);
  const [showGrid, setShowGrid] = useState(false);
  const [useOriginalSettings, setUseOriginalSettings] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(charters && charters.length > 0)) {
      return;
    }
    setSelectedCharterId(charters[0].id);
  }, [charters]);

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    if (!(allCharters && selectedCharterId)) {
      return;
    }

    const selectedCharter = allCharters?.filter((ch) => ch.id === selectedCharterId)[0];
    dispatch(selectCharter(selectedCharter));
  }, [allCharters, selectedCharterId]);

  const onCharterChange = (value: number) => {
    setSelectedCharterId(value);
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

  const onUseOriginalSettingsChange = (e: CheckboxChangeEvent) => {
    setUseOriginalSettings(e.target.checked);
  };

  if (!(companies && charters && companies.length > 0 && charters.length > 0 && selectedCharterId)) {
    return null;
  }

  const initialValues = {
    charterId: charters[0].id,
    theme: THEME_KEYS.ALGIERS,
    format: ANIMATION_FORMATS.FORMAT_16_9,
    textLength: TEXT_LENGTHS.MEDIUM,
  };

  const renderForm = () => {
    return (
      <Form {...layout} name="basic" className={classes.form} initialValues={initialValues}>
        <Form.Item label="Charter" name="charterId">
          <Select onChange={onCharterChange} value={selectedCharterId}>
            {companies
              ?.slice()
              .sort(CompaniesUtils.sortCompaniesByName)
              .map((company: Company) => {
                const companyCharters = company.charters.slice().sort(ChartersUtils.sortChartersByName);
                return companyCharters.map((charter) => (
                  <Option key={charter.id} value={charter.id}>
                    <Preformatted className={classes.companyName}>{company.name}</Preformatted> {charter.name}
                  </Option>
                ));
              })}
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

        <Form.Item label="Use original settings (colors/fonts)" name="useOriginalSettings">
          <Checkbox onChange={onUseOriginalSettingsChange} checked={useOriginalSettings} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="App">
      <FontsLoader charterId={selectedCharterId} token={token} />
      {renderForm()}
      <div className={classes.animationsContainer}>
        {Object.values(ANIMATION_KEYS).map((animationKey: string) => {
          return (
            <ScenePlayerCard
              theme={selectedTheme}
              animation={animationKey}
              format={selectedFormat}
              textLength={selectedTextLength}
              showGrid={showGrid}
              useOriginalSettings={useOriginalSettings}
              key={animationKey}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimationsList;
