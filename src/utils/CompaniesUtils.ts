import { find } from 'lodash';
import Company from '../model/Company';
import { APIModelCompany } from '../services/api/types/CompaniesServiceTypes';
import StringUtils from './StringUtils';

export default class CompaniesUtils {
  static sortCompaniesByName = (companyA: Company, companyB: Company): number =>
    StringUtils.compareNaturalNormalized(companyA.name, companyB.name);

  static getValidCompany = (companiesApi: APIModelCompany[]): Company[] => {
    const activeCompanies: Company[] = [];
    companiesApi
      .filter((apiCompany) => apiCompany.isActive)
      .forEach((apiCompany) => {
        const company = new Company(apiCompany);

        if (!company.isValid()) {
          return;
        }

        activeCompanies.push(company);
      });

    return activeCompanies;
  };

  static getCurrentCompany = (companies: Company[], currentStateCompany?: Company): Company => {
    return (
      find(companies, (company) => company.id === currentStateCompany?.id) ||
      companies.sort(CompaniesUtils.sortCompaniesByName)[0]
    );
  };
}
