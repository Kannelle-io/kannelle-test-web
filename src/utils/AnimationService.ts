import { ANIMATION_FORMATS } from "./../Constants";

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
      width: Math.round(resizedAnimationWidth),
      height: Math.round(resizedAnimationHeight),
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
}

export default AnimationService;
