import { TFunction } from 'i18next';
import moment from 'moment';

export default class TimeUtils {
  static formatSecondsIntoHumanTimeString(timeSeconds: number, t: TFunction): string {
    const duration = moment.duration(timeSeconds, 'seconds');
    const hours = duration.as('hours');
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const momentUTC = moment.utc(duration.asMilliseconds());
    if (hours >= 1) {
      if (hours >= 24) {
        return `${hours} ${t('timeLabel.hours')}`;
      }
      if (minutes) {
        // X h Y min
        return momentUTC.format(t('timeFormats.hoursMinutes'));
      }
      // X h
      return momentUTC.format(t('timeFormats.hours', { count: hours }));
    }

    if (minutes) {
      if (seconds) {
        // X min Y sec
        return momentUTC.format(t('timeFormats.minutesSeconds'));
      }
      // X min
      return momentUTC.format(t('timeFormats.minutes', { count: minutes }));
    }

    // X sec
    return momentUTC.format(t('timeFormats.seconds', { count: seconds }));
  }

  static formatSecondsIntoDuration = (timeInSeconds: number): string => {
    const duration = moment.duration(timeInSeconds, 'seconds');
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (hours > 0) {
      return `${hours}:${TimeUtils.padWithZerosIfNeeded(minutes)}:${TimeUtils.padWithZerosIfNeeded(seconds)}`;
    }

    return `${minutes}:${TimeUtils.padWithZerosIfNeeded(seconds)}`;
  };

  static padWithZerosIfNeeded = (value: number): string => {
    if (value > 9) {
      return value.toString();
    }

    return `0${value}`;
  };

  static getDateISO8061Format = (momentObject: moment.Moment): string => {
    return momentObject.format();
  };

  static fromSecondsToMillis = (seconds: number): number => {
    return seconds * 1000;
  };
}
