/* eslint-disable @typescript-eslint/no-unused-vars */

import { EventObject } from '../../../utils/types/LoggingTypes';

export class AbstractAnalyticsManager {
  logEvent = (event: string, eventProperties: any): void => {
    // do nothing
  };

  logEventObject = (event: EventObject): void => {
    // do nothing
  };
}
