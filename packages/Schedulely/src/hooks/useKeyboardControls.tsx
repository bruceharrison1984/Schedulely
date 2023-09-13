import { useActions } from './useActions';
import { useCalendar } from '@/hooks/useCalendar';
import { useCallback, useEffect } from 'react';

/**
 * Enables keyboard controls.
 */
export const useKeyboardControls = () => {
  const { onNextMonth, onNextYear, onPrevMonth, onPrevYear } = useCalendar();
  const { keyboardEvents } = useActions();

  const navigatePrevMonth = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (keyboardEvents?.onLeftArrow) {
          keyboardEvents.onLeftArrow();
        } else {
          onPrevMonth();
        }
      }
    },
    [onPrevMonth, keyboardEvents]
  );

  const navigatePrevYear = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        if (keyboardEvents?.onDownArrow) {
          keyboardEvents.onDownArrow();
        } else {
          onPrevYear();
        }
      }
    },
    [onPrevYear, keyboardEvents]
  );

  const navigateNextMonth = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        if (keyboardEvents?.onRightArrow) {
          keyboardEvents.onRightArrow();
        } else {
          onNextMonth();
        }
      }
    },
    [onNextMonth, keyboardEvents]
  );

  const navigateNextYear = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        if (keyboardEvents?.onUpArrow) {
          keyboardEvents.onUpArrow();
        } else {
          onNextYear();
        }
      }
    },
    [onNextYear, keyboardEvents]
  );

  useEffect(() => {
    document.addEventListener('keydown', navigatePrevMonth);
    document.addEventListener('keydown', navigatePrevYear);
    document.addEventListener('keydown', navigateNextMonth);
    document.addEventListener('keydown', navigateNextYear);

    return () => {
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
