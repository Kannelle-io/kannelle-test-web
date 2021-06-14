import { APIManager } from '../../../services/api/APIManager';
import { EventObject } from '../../../utils/types/LoggingTypes';

export class AnalyticsManager {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  logEvent = (event: string, eventProperties: any): void => {
    const apiManager = APIManager.getInstance();

    if (!(eventProperties.companyId && this.userId)) {
      return;
    }

    apiManager
      .post(`/analytics`, {
        userId: this.userId,
        event,
        ...eventProperties,
      })
      .catch(() => {
        console.error(
          `[AnalyticsManager] Error while logging event ${event} with the following properties`,
          eventProperties
        );
      });
  };

  logEventObject = (eventObject: EventObject): void => {
    if (!(eventObject.props?.companyId && this.userId)) {
      return;
    }

    const apiManager = APIManager.getInstance();

    apiManager
      .post(`/analytics`, {
        userId: this.userId,
        event: eventObject.name,
        ...eventObject.props,
      })
      .catch(() => {
        console.error(
          `[AnalyticsManager] Error while logging event ${eventObject.name} with the following properties`,
          eventObject.props
        );
      });
  };
}
