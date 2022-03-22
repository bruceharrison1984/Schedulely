import { useCalendar } from './useCalendar';
import { useCallback, useEffect } from 'react';

/**
 * Enables keyboard controls.
 * TODO: This could be expanded to allow for users to pass in their own keybindings
 */
const useKeyboardControls = () => {
  const { onNextMonth, onPrevMonth } = useCalendar();

  const navigatePrevMonth = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrevMonth();
    },
    [onPrevMonth]
  );

  const navigateNextMonth = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNextMonth();
    },
    [onNextMonth]
  );

  useEffect(() => {
    document.addEventListener('keydown', navigatePrevMonth);
    document.addEventListener('keydown', navigateNextMonth);
    () => {
      document.removeEventListener('keydown', navigatePrevMonth);
      document.removeEventListener('keydown', navigateNextMonth);
    };
  }, [navigatePrevMonth, navigateNextMonth]);
};

export default useKeyboardControls;
