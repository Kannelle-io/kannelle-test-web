import { CancelTokenSource } from 'axios';
import { APIManager } from './APIManager';
import { APIGetUserResult } from './types/UsersServiceTypes';

const getUserById = (userId: string): Promise<APIGetUserResult> => {
  const apiManager = APIManager.getInstance();

  return apiManager.get(`/users/${userId}`);
};

const getUserByEmail = (email: string, cancelSource?: CancelTokenSource): Promise<APIGetUserResult> => {
  const apiManager = APIManager.getInstance();

  return apiManager.get(`/users?email=${email}`, {
    cancelToken: cancelSource?.token || undefined,
  });
};

export { getUserById, getUserByEmail };
