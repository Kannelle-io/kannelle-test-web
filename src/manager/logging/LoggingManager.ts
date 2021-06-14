import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { EventObject } from '../../utils/types/LoggingTypes';
import { AbstractAmplitudeManager } from './amplitude/AbstractAmplitudeManager';
import { AmplitudeManager } from './amplitude/AmplitudeManager';
import { AbstractAnalyticsManager } from './analytics/AbstractAnalyticsManager';
import { AnalyticsManager } from './analytics/AnalyticsManager';

export class LoggingManager {
  _amplitudeManager: AbstractAmplitudeManager;
  _analyticsManager: AbstractAnalyticsManager;

  constructor(user?: any) {
    const auth0UserIdPrefix = process.env.REACT_APP_AUTH0_USER_ID_PREFIX ?? '';
    const userId = user?.sub.replace(auth0UserIdPrefix, '');

    this._analyticsManager = new AnalyticsManager(userId);
    this._amplitudeManager = new AmplitudeManager();

    // We initialize both tools
    // If a user a provided, we also set user props in both tools
    this.initSentry(user, userId);
    this.initAmplitude(user, userId);
  }

  private initSentry = (user?: any, userId?: string): void => {
    // Sentry
    const sentryDSN = process.env.REACT_APP_SENTRY_DSN || '';
    if (sentryDSN === '') {
      return;
    }

    Sentry.init({
      dsn: sentryDSN,
      integrations: [
        new Integrations.BrowserTracing(),
        new Sentry.Integrations.Breadcrumbs({
          console: process.env.REACT_APP_ENVIRONMENT !== 'dev',
        }),
      ],
      tracesSampleRate: 1.0,
      release: process.env.REACT_APP_VERSION,
      environment: process.env.REACT_APP_ENVIRONMENT,
      // Some noise errors just caused by some browser versions we don't want to track (see https://stackoverflow.com/a/50387233)
      ignoreErrors: ['ResizeObserver loop limit exceeded'],
      normalizeDepth: 6,
    });

    if (!(user && userId)) {
      return;
    }

    Sentry.setUser({
      id: userId,
      email: user.email,
      emailVerified: true,
      isActive: true,
      username: user.name,
      nickname: user.nickname,
    });

    Sentry.setTag('userEmail', user.email);
  };

  private initAmplitude = (user?: any, userId?: string): void => {
    if (!(user && userId)) {
      return;
    }

    this._amplitudeManager.setUserId(userId);
    this._amplitudeManager.setUserProperties({
      auth0Id: userId,
      email: user.email,
      emailVerified: true,
      isActive: true,
      name: user.name,
      nickname: user.nickname,
    });
  };

  logEvent = (event: string, eventProperties: any): void => {
    // Amplitude
    this._amplitudeManager.logEvent(event, eventProperties);

    // Analytics
    this._analyticsManager.logEvent(event, eventProperties);

    // Sentry
    Sentry.addBreadcrumb({
      category: event,
      message: event,
      data: eventProperties,
      level: Sentry.Severity.Log,
    });
  };

  logEventObject = (eventObject: EventObject): void => {
    // Amplitude
    this._amplitudeManager.logAmplitudeEvent(eventObject);

    // Analytics
    this._analyticsManager.logEventObject(eventObject);

    // Sentry
    Sentry.addBreadcrumb({
      category: eventObject.name,
      message: eventObject.name,
      data: eventObject.props,
      level: Sentry.Severity.Log,
    });
  };
}
