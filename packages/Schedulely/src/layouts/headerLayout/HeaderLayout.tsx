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
    currentDate,
    onNextMonth,
    onNextYear,
    onPrevYear,
    onPrevMonth,
    currentMonth,
    currentYear,
    dateAdapter: { isCurrentMonth, getFirstDayOfMonth, getLastDayOfMonth },
  } = useCalendar();
  const { onMonthChangeClick } = useActions();
  const { headerComponent: Header } = useComponents();
  const { breakpoint } = useBreakpoint();

  useEffect(() => {
    const firstOfMonth = getFirstDayOfMonth(currentDate);
    const lastOfMonth = getLastDayOfMonth(currentDate);
    onMonthChangeClick(firstOfMonth, lastOfMonth);
  }, [currentDate, onMonthChangeClick]);

  useKeyboardControls();

  return (
    <Header
      isCurrentMonth={isCurrentMonth(currentDate)}
      month={currentMonth}
      year={currentYear}
      onNextMonth={onNextMonth}
      onNextYear={onNextYear}
      onPrevMonth={onPrevMonth}
      onPrevYear={onPrevYear}
      componentSize={breakpoint}
    />
  );
};
