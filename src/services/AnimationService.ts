import { ANIMATION_FORMATS, ANIMATION_KEYS, THEME_KEYS } from '../Constants';
/* eslint-disable camelcase */
import Sample16_9 from '../resources/videos/sample-16_9.mp4';
import Sample1_1 from '../resources/videos/sample-1_1.mp4';
import Sample9_16 from '../resources/videos/sample-9_16.mp4';
import VideoEmpty from '../resources/videos/video_empty_10.mp4';
import { AnimationPosition, AnimationPositionStyle, PIP, PipEffects, Size } from '../types/AnimationType';

class AnimationService {
  // Compute the size of the animation player depending on the animation format,
  // the actual Lottie animation size, and the initial size of the container player (scale it)
  static getAnimationPlayerSize = (
    lottieObject: any,
    playerInitialSize: Size,
    animationFormat: string
  ): Size | undefined => {
    const animationSize = AnimationService.getAnimationSizeFromLottieFile(lottieObject);

    if (playerInitialSize.height <= 0 || playerInitialSize.width <= 0) {
      return undefined;
    }

    const projectReferenceWidth = AnimationService.getReferenceWidthByFormat(animationFormat);
    const projectReferenceHeight = AnimationService.getReferenceHeightByFormat(animationFormat);

    const resizedAnimationHeight = (playerInitialSize.height * animationSize.height) / projectReferenceHeight;
    const resizedAnimationWidth = (playerInitialSize.width * animationSize.width) / projectReferenceWidth;

    return {
      width: resizedAnimationWidth,
      height: resizedAnimationHeight,
    };
  };

  // Read the animation dimensions from the JSON Lottie file
  static getAnimationSizeFromLottieFile = (lottieObject: any): Size => {
    return { width: lottieObject.w, height: lottieObject.h };
  };

  // Get the reference width for each format
  static getReferenceWidthByFormat = (format: string): number => {
    switch (format) {
      case ANIMATION_FORMATS.FORMAT_1_1:
        return 1440;
      case ANIMATION_FORMATS.FORMAT_9_16:
        return 1080;
      case ANIMATION_FORMATS.FORMAT_16_9:
      default:
        return 1920;
    }
  };

  // Get the reference height for each format
  static getReferenceHeightByFormat = (format: string): number => {
    switch (format) {
      case ANIMATION_FORMATS.FORMAT_1_1:
        return 1440;
      case ANIMATION_FORMATS.FORMAT_9_16:
        return 1920;
      case ANIMATION_FORMATS.FORMAT_16_9:
      default:
        return 1080;
    }
  };

  // Depending on the format and the size of the player container, determine the
  // actual size of the scene player to display
  // (ex.: 9:16 rectangle fitting into the 16:9 black parent container)
  static getVideoPlayerSizeByFormat = (format: string, playerTotalSize: Size): Size => {
    return {
      height: playerTotalSize.height,
      width: playerTotalSize.height * AnimationService.getFormatAspectRatio(format),
    };
  };

  // Compute the animation position style (scale it) depending on the code and the x/y
  // (which are related to the project reference dimensions)
  static getAnimationPositionStyle = (
    animationFormat: string,
    position: AnimationPosition,
    playerTotalSize: Size
  ): AnimationPositionStyle => {
    const projectReferenceWidth = AnimationService.getReferenceWidthByFormat(animationFormat);
    const projectReferenceHeight = AnimationService.getReferenceHeightByFormat(animationFormat);
    const newX = position.x ? (position.x * playerTotalSize.width) / projectReferenceWidth : 0;
    const newY = position.y ? (position.y * playerTotalSize.height) / projectReferenceHeight : 0;

    switch (position.code) {
      case 'BOTTOMLEFT': {
        return {
          left: newX,
          bottom: newY,
        };
      }
      case 'BOTTOMRIGHT': {
        return {
          right: newX,
          bottom: newY,
        };
      }
      case 'FULLSCREEN':
      default:
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        };
    }
  };

  // Get the aspect ratio as a number
  static getFormatAspectRatio = (format: string): number => {
    switch (format) {
      case ANIMATION_FORMATS.FORMAT_9_16:
        return 9 / 16;
      case ANIMATION_FORMATS.FORMAT_1_1:
        return 1 / 1;
      case ANIMATION_FORMATS.FORMAT_16_9:
      default:
        return 16 / 9;
    }
  };

  // Get the list of every Slide animation (no associated video nor image)
  static getSlideAnimations = (): string[] => {
    return [
      ANIMATION_KEYS.BIRD,
      ANIMATION_KEYS.DELOREAN,
      ANIMATION_KEYS.DODGE,
      ANIMATION_KEYS.FORD,
      ANIMATION_KEYS.LINCOLN,
      ANIMATION_KEYS.OWL,
      ANIMATION_KEYS.PEUGEOT,
      ANIMATION_KEYS.RAM,
      ANIMATION_KEYS.ROUSH,
      ANIMATION_KEYS.SIMCA,
      ANIMATION_KEYS.VELIB,
    ];
  };

  // Check if a given animation is a Slide or not
  static isSlideAnimation = (animation: string): boolean => {
    return AnimationService.getSlideAnimations().includes(animation);
  };

  // Compute the scene current time percentage from the number of played seconds and
  // the scene total duration
  static getScenePercentage = (playedSeconds: number, sceneDuration: number) => {
    return playedSeconds / sceneDuration;
  };

  // Check if the videoUrl passed as param is the VideoEmpty
  static isVideoEmpty = (videoUrl: string) => {
    return videoUrl === VideoEmpty;
  };

  // Compute the style to apply to the PIP image depending on the effect name and value
  static computeImagePipEffectStyle = (currentTime: number, pip: PIP, playerSize: Size) => {
    if (!(pip.source && pip.duration && pip.effect?.name && pip.effect.value)) {
      return undefined;
    }

    const progress = currentTime / pip.duration;
    const effectName = pip.effect.name;
    const effectValue = pip.effect.value;

    switch (effectName) {
      case PipEffects.ZOOMIN.code: {
        const scale = 1 + (effectValue - 1) * progress;
        return { transform: `scale(${scale})` };
      }
      case PipEffects.ZOOMOUT.code: {
        const scale = 1 + (effectValue - 1) * (1 - progress);
        return { transform: `scale(${scale})` };
      }
      case PipEffects.TRANSLATION_RIGHT.code: {
        const scale = 1 + effectValue;
        const translationX = -(playerSize.width * effectValue * (1 - 2 * progress)) / 2;
        const translationY = 0;
        return { transform: `scale(${scale}) translate(${translationX}px, ${translationY}px)` };
      }
      case PipEffects.TRANSLATION_LEFT.code: {
        const scale = 1 + effectValue;
        const translationX = (playerSize.width * effectValue * (1 - 2 * progress)) / 2;
        const translationY = 0;
        return { transform: `scale(${scale}) translate(${translationX}px, ${translationY}px)` };
      }
      default:
        return undefined;
    }
  };

  /**
   *
   * HELPERS (for Kannelle-Test)
   *
   */
  // Get the default postion for each animation
  static getDefaultPosition = (theme: string, animation: string): AnimationPosition => {
    // Special case for BERLIN-NISSAN: animation is like BOTTOMCENTER
    if (theme === THEME_KEYS.BERLIN && animation === ANIMATION_KEYS.NISSAN) {
      return {
        code: 'BOTTOMRIGHT',
        x: 0,
        y: 0,
      };
    }

    switch (animation) {
      case ANIMATION_KEYS.NISSAN:
      case ANIMATION_KEYS.MUSTANG:
      case ANIMATION_KEYS.MAZDA:
        return {
          code: 'BOTTOMRIGHT',
          x: 50,
          y: 50,
        };
      default:
        return {
          code: 'FULLSCREEN',
          x: undefined,
          y: undefined,
        };
    }
  };

  // Get the path to the sample video for Recordable animations
  static getSampleVideoByFormat = (format: string): string => {
    switch (format) {
      case ANIMATION_FORMATS.FORMAT_9_16:
        return Sample9_16;
      case ANIMATION_FORMATS.FORMAT_1_1:
        return Sample1_1;
      case ANIMATION_FORMATS.FORMAT_16_9:
      default:
        return Sample16_9;
    }
  };
}

export default AnimationService;
