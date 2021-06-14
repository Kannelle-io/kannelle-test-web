/* eslint-disable @typescript-eslint/no-unused-vars */

import { EventObject } from '../../../utils/types/LoggingTypes';

export class AbstractAmplitudeManager {
  logEvent = (event: string, eventProperties: any): void => {
    // do nothing
  };

  logAmplitudeEvent = (event: EventObject): void => {
    // do nothing
  };

  setUserId = (userId: string): void => {
    // do nothing
  };

  setUserProperties = (properties: any): void => {
    // do nothing
  };
}
