import { Action, action } from 'typesafe-actions';
import Company from '../../model/Company';

export enum COMPANIES_ACTION_TYPE {
  INITIALIZE_COMPANIES = 'INITIALIZE_COMPANIES',
  SELECT_COMPANY = 'SELECT_COMPANY',
}

export const initializeCompanies = (companies: Array<Company>): Action => {
  return action(COMPANIES_ACTION_TYPE.INITIALIZE_COMPANIES, companies);
};

export const selectCompany = (company: Company): Action => {
  return action(COMPANIES_ACTION_TYPE.SELECT_COMPANY, company);
};
