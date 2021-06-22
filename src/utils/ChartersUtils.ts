import { APIModelCharter } from '../services/api/types/ChartersServiceTypes';
import StringUtils from './StringUtils';

export default class CharterUtils {
  static sortChartersByName = (charterA: APIModelCharter, charterB: APIModelCharter): number =>
    StringUtils.compareNaturalNormalized(charterA.name, charterB.name);
}
