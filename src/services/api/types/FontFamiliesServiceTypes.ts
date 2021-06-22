export type APIGetFontFamiliesResponse = {
  data: FontFamilies;
};

export type FontFamilies = {
  items: FontFamily[];
};

export type FontFamily = {
  id: number;
  name: string;
  isActive: boolean;
  stylesheetUrl: string;
  createdAt: string;
  updatedAt: string;
  fonts: Font[];
};

export type Font = {
  id: number;
  operationId: string;
  fullName: string;
  postScriptName: string;
  copyright: string;
  weight: number;
  style: 'normal' | 'italic';
  isActive: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  fontFamilyName?: string; // For the front-end
};
