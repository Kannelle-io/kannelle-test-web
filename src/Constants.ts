export const apiUrl = 'https://5zq5gyulni.execute-api.eu-west-3.amazonaws.com/f-anim';

export enum THEME_KEYS {
  ALGIERS = 'ALGIERS',
  BALI = 'BALI',
  GENEVA = 'GENEVA',
  LOS_ANGELES = 'LOS_ANGELES',
  SEATTLE = 'SEATTLE',
  BERLIN = 'BERLIN',
  BOGOTA = 'BOGOTA',
}

export enum ANIMATION_FORMATS {
  FORMAT_16_9 = '16:9',
  FORMAT_1_1 = '1:1',
  FORMAT_9_16 = '9:16',
}

export enum ANIMATION_KEYS {
  FORD = 'FORD',
  PEUGEOT = 'PEUGEOT',
  PLANE = 'PLANE',
  SIMCA = 'SIMCA',
  MINI = 'MINI',
  AUSTIN = 'AUSTIN',
  AVENTI = 'AVENTI',
  BIRD = 'BIRD',
  CITROEN = 'CITROEN',
  BUTTERFLY = 'BUTTERFLY',
  FOX = 'FOX',
  LIME = 'LIME',
  MAZDA = 'MAZDA',
  MCLAREN = 'MCLAREN',
  MUSTANG = 'MUSTANG',
  NISSAN = 'NISSAN',
  OWL = 'OWL',
  SKATEBOARD = 'SKATEBOARD',
  VELIB = 'VELIB',
  DELOREAN = 'DELOREAN',
  DODGE = 'DODGE',
  LINCOLN = 'LINCOLN',
  RAM = 'RAM',
  ROUSH = 'ROUSH',
  TOYOTA = 'TOYOTA',
  VECTOR = 'VECTOR',
}

export enum TEXT_LENGTHS {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum NODE_ENV {
  DEVELOPMENT = 'development',
}

export const THEME = {
  MENU: {
    MAIN_TEXT_COLOR: '#003E6B',
    MAIN_BACKGROUND_COLOR: '#DCEEFB',
    DEFAULT_TEXT_COLOR: '#222222',
    DEFAULT_ICON_COLOR: '#7E7E7E',
    FONT_SIZE_TEXT: 14,
    FONT_SIZE_ICON: 18,
  },
  DEFAULT: {
    MAIN_COLOR: '#3371FF',
  },
};

export const AXIOS_PARAMS = {
  TIMEOUT_IN_MS: 15000,
  TIMEOUT_IN_MS_LARGE_FOR_KNL_TEAM_HEAVY_OPERATIONS: 30000,
};

export type RouteLink = { key: string; path: string; title: string };

export const LINK: Record<string, RouteLink> = {
  HOME: {
    key: '/home',
    path: '/home',
    title: 'menu.home',
  },
  UNAUTHORIZED: {
    key: '/unauthorizer',
    path: '/unauthorizer',
    title: 'menu.unauthorizer',
  },
};
