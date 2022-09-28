import { useCalendar } from './useCalendar';
import { useCallback, useEffect } from 'react';

/**
 * Enables keyboard controls.
 * TODO: This could be expanded to allow for users to pass in their own keybindings
 */
export const useKeyboardControls = () => {
  const { onNextMonth, onNextYear, onPrevMonth, onPrevYear } = useCalendar();

  const navigatePrevMonth = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrevMonth();
    },
    [onPrevMonth]
  );

  const navigatePrevYear = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') onPrevYear();
    },
    [onPrevYear]
  );

  const navigateNextMonth = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNextMonth();
    },
    [onNextMonth]
  );

  const navigateNextYear = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') onNextYear();
    },
    [onNextYear]
  );

  useEffect(() => {
    document.addEventListener('keydown', navigatePrevMonth);
    document.addEventListener('keydown', navigatePrevYear);
    document.addEventListener('keydown', navigateNextMonth);
    document.addEventListener('keydown', navigateNextYear);
    () => {
      document.removeEventListener('keydown', navigatePrevMonth);
      document.removeEventListener('keydown', navigatePrevYear);
      document.removeEventListener('keydown', navigateNextMonth);
      document.removeEventListener('keydown', navigateNextYear);
    };
  }, [
    navigatePrevMonth,
    navigateNextMonth,
    navigatePrevYear,
    navigateNextYear,
  ]);
};
