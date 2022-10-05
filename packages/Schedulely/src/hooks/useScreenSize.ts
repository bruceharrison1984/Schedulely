import { DisplaySize } from '../types';
import { useCallback, useLayoutEffect, useState } from 'react';

/**
 * Watch the size of the screen and make it available as the DisplaySize enum.
 * @returns Current display size
 */
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<DisplaySize>(DisplaySize.tiny);

  const createQueryListener = useCallback(
    (mediaQuery: string, size: DisplaySize) => {
      const media = window.matchMedia(mediaQuery);
      if (media.matches && screenSize !== size) setScreenSize(size);

      const listener = () => setScreenSize(size);
      window.addEventListener('resize', listener);
      return listener;
    },
    [setScreenSize, screenSize]
  );

  useLayoutEffect(() => {
    const tinyQuery = createQueryListener(
      '(max-width: 500px)',
      DisplaySize.tiny
    );

    const mediumQuery = createQueryListener(
      '(max-width: 800px) and (min-width: 501px)',
      DisplaySize.medium
    );

    const largeQuery = createQueryListener(
      '(min-width: 801px)',
      DisplaySize.large
    );

    return () => {
      window.removeEventListener('resize', tinyQuery);
      window.removeEventListener('resize', mediumQuery);
      window.removeEventListener('resize', largeQuery);
    };
  }, [createQueryListener]);

  return screenSize;
};
