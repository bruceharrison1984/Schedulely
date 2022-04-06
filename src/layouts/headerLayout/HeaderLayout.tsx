import { useCalendar, useComponents } from '@/hooks/index';
import { useKeyboardControls } from '@/hooks/index';

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

  const { headerComponent: Header } = useComponents();

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
    />
  );
};
