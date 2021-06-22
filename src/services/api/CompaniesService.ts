import { CancelTokenSource } from 'axios';
import { APIManager } from './APIManager';
import { APIGetCompaniesResult } from './types/CompaniesServiceTypes';

const getCompaniesByUser = (userId: string, cancelSource?: CancelTokenSource): Promise<APIGetCompaniesResult> => {
  const apiManager = APIManager.getInstance();

  return apiManager.get(`/users/${userId}/charters?type=enterprise`, {
    cancelToken: cancelSource?.token || undefined,
  });
};

export { getCompaniesByUser };
