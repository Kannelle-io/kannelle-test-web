import Company from '../model/Company';

export default class SecurityUtils {
  static isPlatformAccessible = (companies: Company[]): boolean => {
    return companies?.length > 0;
  };
}
