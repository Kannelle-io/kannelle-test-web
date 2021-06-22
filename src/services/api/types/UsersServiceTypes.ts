/* eslint-disable camelcase */
/**
 *
 * API MODELS
 *
 */
import { Roles } from '../../../core/rule/RolesTypes';
import { APICharterPermission } from './ChartersServiceTypes';

export type APIModelUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type APIModelUserEnriched = APIModelUser & {
  acl: {
    role: Roles;
    isActive: boolean;
    permissions: APICharterPermission[];
  };
};

export type APIGetUserResult = {
  data: APIModelUser;
  status: number;
};
