import { useActions, useCalendar, useComponents } from '@/hooks/index';
import { useEffect } from 'react';
import { useKeyboardControls } from '@/hooks/index';
import useResizeObserver from '@/hooks/useResizeObserver';

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
    dateAdapter: { getMonthName, getYear, isCurrentMonth },
  } = useCalendar();
  const { observedRef, breakSize } = useResizeObserver();
  const { onMonthChangeClick } = useActions();
  const { headerComponent: Header } = useComponents();

  useEffect(() => {
    const firstOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastOfMonth = new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth() + 1,
      1,
      0,
      0,
      -1
    );
    onMonthChangeClick(firstOfMonth, lastOfMonth);
  }, [currentMonth, onMonthChangeClick]);

  useKeyboardControls();

  return (
    <div ref={observedRef}>
      <Header
        isCurrentMonth={isCurrentMonth(currentMonth)}
        month={getMonthName(currentMonth)}
        year={getYear(currentMonth)}
        onNextMonth={onNextMonth}
        onNextYear={onNextYear}
        onPrevMonth={onPrevMonth}
        onPrevYear={onPrevYear}
        componentSize={breakSize}
      />
    </div>
  );
};
