import { APIManager } from './APIManager';
import { APIGetUserResult } from './types/UsersServiceTypes';

const getUserById = (userId: string): Promise<APIGetUserResult> => {
  const apiManager = APIManager.getInstance();

  return apiManager.get(`/users/${userId}`);
};

export { getUserById };
