import amplitude, { AmplitudeClient } from 'amplitude-js';
import { EventObject } from '../../../utils/types/LoggingTypes';
import { AbstractAmplitudeManager } from './AbstractAmplitudeManager';

export class AmplitudeManager extends AbstractAmplitudeManager {
  _instance: AmplitudeClient;

  constructor() {
    super();

    const instance = amplitude.getInstance();
    const amplitudeKey = process.env.REACT_APP_AMPLITUDE_KEY || '';
    instance.init(amplitudeKey);
    this._instance = instance;
  }

  logEvent = (event: string, eventProperties: any): void => {
    this._instance.logEvent(event, eventProperties);
  };

  logAmplitudeEvent = (event: EventObject): void => {
    this._instance.logEvent(event.name, event.props);
  };

  setUserId = (userId: string): void => {
    this._instance.setUserId(userId);
  };

  setUserProperties = (properties: any): void => {
    this._instance.setUserProperties(properties);
  };
}
