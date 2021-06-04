import { useEffect, useState } from "react";

export type WindowSize = {
  height?: number;
  width?: number;
};

const useWindowSize = (): WindowSize => {
  const isClient = typeof window === "object";

  const getSize = (): WindowSize => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const handleResize = (): void => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export default useWindowSize;
