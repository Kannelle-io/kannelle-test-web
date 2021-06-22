import deburr from 'lodash/deburr';
import naturalCompare from 'natural-compare';

export default class StringUtils {
  static normalize(stringToNormalize: string): string {
    return deburr(stringToNormalize.toLowerCase());
  }

  static compareNaturalNormalized(stringA: string, stringB: string): number {
    return naturalCompare(StringUtils.normalize(stringA), StringUtils.normalize(stringB));
  }

  static checkIsEmail(stringToTest: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(stringToTest);
  }
}
