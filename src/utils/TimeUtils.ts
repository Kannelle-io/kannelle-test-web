import moment from 'moment';

export default class TimeUtils {
  // Convert seconds to milliseconds
  static fromSecondsToMillis = (seconds: number): number => {
    return seconds * 1000;
  };

  // Format a time in seconds into a human readable duration string value
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

  // Pad a number value with a 0 if its lower than 9
  static padWithZerosIfNeeded = (value: number): string => {
    if (value > 9) {
      return value.toString();
    }

    return `0${value}`;
  };
}
