/* eslint-disable import/no-cycle */
/**
 *
 * API MODELS
 *
 */
import { Area } from 'react-easy-crop/types';
import { Font } from './FontFamiliesServiceTypes';
import { APIModelUserEnriched } from './UsersServiceTypes';

export type APIModelCharter = {
  createdAt: string;
  currentUser: { isActive: boolean; role: string; permissions: APICharterPermission[] };
  emailPatterns: string[];
  firmColors: string[];
  hiddenTemplates: [];
  id: number;
  name: string;
  plan: string;
  privateTemplates: [];
  themeColors: Array<APIModelThemeColor>;
  updatedAt: string;
  uri: string;
  onlyPrivateScenarios: boolean;
  // below are front end only param
  updating?: { role?: boolean; isActive?: boolean };
  highlightRow?: boolean; // info for table highlight
};

export type APIFullModelCharter = {
  createdAt: string;
  emailPatterns: string[];
  firmColors: string[];
  fontFiles: any;
  hiddenTemplates: [];
  id: number;
  name: string;
  plan: string;
  privateTemplates: string[];
  themeColors: Array<APIModelThemeColor>;
  updatedAt: string;
  uri: string;
  themeFonts?: ThemeFonts;
  onlyPrivateScenarios: boolean;
};

export type Subtitles = {
  currentUsage: number;
};

export type DashboardSubtitles = {
  subtitles: Subtitles;
};

export type UsersModelCharter = APIModelUserEnriched & {
  updating?: { role?: boolean; isActive?: boolean };
  highlightRow?: boolean;
  charter?: any; // todo a supprimer hein
};

export type ThemeFonts = {
  titleFont: Font;
  textFont: Font;
};

export type APIModelThemeColor = {
  code: string;
  colors: { [key: string]: string };
};

export type APICharterPermissionRoleAccess = {
  code: string;
  hasAccess: {
    access: boolean;
    locked: boolean;
    value?: string;
  };
};

export type APICharterPermission = {
  code: string;
  name: string;
  section: string;
  target: string;
  allowedValues?: string[];
  roles: Array<APICharterPermissionRoleAccess>;
};

export type APIUpdateCharterPermissionsResult = {
  code: string;
  name: string;
  target: string;
  section: string;
  access: string;
  locked: string;
  value?: string;
};

export type MediaCroppedArea = Area;

export type APIUpdateCharterScenarioMetadataParams = {
  scope: string;
  coverImageSourceMedia: {
    id: number;
    croppedArea: MediaCroppedArea;
  };
  defaultTheme: string;
  isMain: string;
};

export type APIPatchCharterThemeFontsByCharterIdParams = {
  titleFontId?: number;
  textFontId?: number;
};

export type APIPatchCharterThemeFontsByCharterIdResponse = APIFullModelCharter;

export type APIUsersModelCharterResponse = {
  data: UsersModelCharter;
  status: number;
};

export type APIPatchCharterUsersByCharterIdResult = APIUsersModelCharterResponse;

export type APICharterResponse = {
  data: APIFullModelCharter;
};

export type APIGetCharterPermissionsResult = {
  items: Array<APICharterPermission>;
  count: number;
};

export type APIGetCharterPermissionsResponse = {
  data: APIGetCharterPermissionsResult;
};

export type APIUpdateCharterPermissionResponse = {
  data: APIUpdateCharterPermissionsResult;
};
