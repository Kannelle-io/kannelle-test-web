/**
 *
 * API MODELS
 *
 */
import { APIModelCharter, DashboardSubtitles } from './ChartersServiceTypes';

export type APIModelCompany = {
  createdAt: string;
  id: number;
  isActive: boolean;
  name: string;
  charters: Array<APIModelCharter>;
};

export type APICreateCompanyCharterParams = {
  name: string;
  colors: Array<string>;
};

export type APIModelCompanies = {
  count: number;
  items: Array<APIModelCompany>;
};

export type APICompanyNotificationConfig = {
  id: number;
  code: string;
  name: string;
  scope: 'CLIENT' | 'PROSPECT';
  isEmailActive: boolean;
  isWebActive: boolean;
};

export type APICompanyUsers = {
  id: string;
  name: string;
  createdAt: string;
  dashboard: DashboardSubtitles;
  email: string;
  updatedAt: string;
  updating?: { role?: boolean; isActive?: boolean };
  highlightRow?: boolean;
  charters: APIModelCharter[];
};

export type APICompanyNotificationConfigs = {
  items: APICompanyNotificationConfig[];
};

export type APIGetCompaniesResultResponse = {
  data: APIModelCompanies;
};

/**
 *
 * API RESULTS
 *
 */

export type APIGetCompaniesResult = APIGetCompaniesResultResponse;
