import {
  useActions,
  useBreakpoint,
  useCalendar,
  useComponents,
  useKeyboardControls,
} from '@/hooks';
import { useEffect } from 'react';

/**
 * This component controls the layout of the header that display the controls and the current month/year description
 * @returns HeaderLayout component
 */
export const HeaderLayout = () => {
  const {
    currentMonth,
    onNextMonth,
    onNextYear,
    onPrevYear,
    onPrevMonth,
    dateAdapter: {
      getMonthName,
      getYear,
      isCurrentMonth,
      getFirstDayOfMonth,
      getLastDayOfMonth,
    },
  } = useCalendar();
  const { onMonthChangeClick } = useActions();
  const { headerComponent: Header } = useComponents();
  const { breakpoint } = useBreakpoint();

  useEffect(() => {
    const firstOfMonth = getFirstDayOfMonth(currentMonth);
    const lastOfMonth = getLastDayOfMonth(currentMonth);
    onMonthChangeClick(firstOfMonth, lastOfMonth);
  }, [currentMonth, onMonthChangeClick]);

  useKeyboardControls();

  return (
    <Header
      isCurrentMonth={isCurrentMonth(currentMonth)}
      month={getMonthName(currentMonth)}
      year={getYear(currentMonth)}
      onNextMonth={onNextMonth}
      onNextYear={onNextYear}
      onPrevMonth={onPrevMonth}
      onPrevYear={onPrevYear}
      componentSize={breakpoint}
    />
  );
};
