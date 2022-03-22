import { useCalendar } from './useCalendar';
import { useCallback, useEffect } from 'react';

/**
 * Enables keyboard controls.
 * TODO: This could be expanded to allow for users to pass in their own keybindings
 */
const useKeyboardControls = () => {
  const { onNextMonth, onPrevMonth } = useCalendar();

  const keyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft': {
          onPrevMonth();
          break;
        }
        case 'ArrowRight': {
          onNextMonth();
          break;
        }
      }
    },
    [onPrevMonth, onNextMonth]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyboardEvent);
    () => {
      document.removeEventListener('keydown', keyboardEvent);
    };
  }, [keyboardEvent]);
};

export default useKeyboardControls;
