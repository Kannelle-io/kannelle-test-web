import { MediaFile } from '../services/api/types/ChartersServiceTypes';

export type AnimationPosition = { code: string; x?: number; y?: number };
export type AnimationPositionStyle = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export type Size = {
  height: number;
  width: number;
};

export type PIP = {
  source: MediaFile;
  duration: number;
  startAt: number;
  effect?: {
    name?: string;
    value?: number;
  };
};

export const PipEffects: PipEffectOptions = {
  ZOOMIN: {
    code: 'ZOOMIN',
    key: 'projects.pip.effectOptions.zoomIn',
    allowedValues: [1.2, 1.5],
  },
  ZOOMOUT: {
    code: 'ZOOMOUT',
    key: 'projects.pip.effectOptions.zoomOut',
    allowedValues: [1.2, 1.5],
  },
  TRANSLATION_LEFT: {
    code: 'TRANSLATION_LEFT',
    key: 'projects.pip.effectOptions.translationLeft',
    allowedValues: [0.1, 0.3],
  },
  TRANSLATION_RIGHT: {
    code: 'TRANSLATION_RIGHT',
    key: 'projects.pip.effectOptions.translationRight',
    allowedValues: [0.1, 0.3],
  },
};

export type PipEffectOptions = Record<string, PipEffect>;
export type PipEffect = {
  code: string;
  key: string;
  allowedValues: number[];
};
