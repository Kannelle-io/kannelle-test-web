/* eslint-disable camelcase */
/**
 *
 * API MODELS
 *
 */

export type APIModelUser = {
  id: string;
  email: string;
  name: string;
};

export type APIGetUserResult = {
  data: APIModelUser;
  status: number;
};
