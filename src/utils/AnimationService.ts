import { ANIMATION_FORMATS, ANIMATION_KEYS, THEME_KEYS } from "./../Constants";
import Sample16_9 from "../resources/videos/sample-16_9.mp4";
import Sample9_16 from "../resources/videos/sample-9_16.mp4";
import Sample1_1 from "../resources/videos/sample-1_1.mp4";

class AnimationService {
  static getAnimationPlayerSize = (
    lottieObject: any,
    playerInitialSize: { width: number; height: number },
    animationFormat: string
  ) => {
    const animationSize =
      AnimationService.getAnimationSizeFromLottieFile(lottieObject);

    if (playerInitialSize.height <= 0 || playerInitialSize.width <= 0) {
      return;
    }

    const projectReferenceWidth =
      AnimationService.getReferenceWidthByFormat(animationFormat);
    const projectReferenceHeight =
      AnimationService.getReferenceHeightByFormat(animationFormat);

    const resizedAnimationHeight =
      (playerInitialSize.height * animationSize.height) /
      projectReferenceHeight;
    const resizedAnimationWidth =
      (playerInitialSize.width * animationSize.width) / projectReferenceWidth;

    return {
      width: resizedAnimationWidth,
      height: resizedAnimationHeight,
    };
  };

  static getAnimationSizeFromLottieFile = (lottieObject: any) => {
    return { width: lottieObject.w, height: lottieObject.h };
  };

  static getReferenceWidthByFormat = (format: string) => {
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

  static getReferenceHeightByFormat = (format: string) => {
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

  static isLowerThirdByPosition = (positionCode: string) => {
    return positionCode !== "FULLSCREEN";
  };

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

  static isSlideAnimation = (animation: string) => {
    return AnimationService.getSlideAnimations().includes(animation);
  };

  // Helpers
  static getDefaultPosition = (theme: string, animation: string) => {
    // Special case for BERLIN-NISSAN: animation is like BOTTOMCENTER
    if (theme === THEME_KEYS.BERLIN && animation === ANIMATION_KEYS.NISSAN) {
      return {
        code: "BOTTOMRIGHT",
        x: 0,
        y: 0,
      };
    }

    switch (animation) {
      case ANIMATION_KEYS.NISSAN:
      case ANIMATION_KEYS.MUSTANG:
      case ANIMATION_KEYS.MAZDA:
        return {
          code: "BOTTOMRIGHT",
          x: 50,
          y: 50,
        };
      default:
        return {
          code: "FULLSCREEN",
          x: undefined,
          y: undefined,
        };
    }
  };

  static getSampleVideoByFormat = (format: string) => {
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
