import { DisplaySize } from '../types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Watch the size of the screen and make it available as the DisplaySize enum.
 * @returns Current display size
 */
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<DisplaySize>(DisplaySize.large);

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

  useEffect(() => {
    const tinyQuery = createQueryListener(
      '(max-width: 480px)',
      DisplaySize.tiny
    );

    const mediumQuery = createQueryListener(
      '(max-width: 768px) and (min-width: 481px)',
      DisplaySize.medium
    );

    const largeQuery = createQueryListener(
      '(min-width: 769px)',
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

export default useScreenSize;
