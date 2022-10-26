import { useBreakpoint, useCalendar, useComponents } from '@/hooks';

/**
 * This component controls the layout of the header that display the controls and the current month/year description.
 * This is just a wrapper so we can access context and pass it into user supplied components
 * @returns HeaderLayout component
 */
export const HeaderLayout = () => {
  const {
    onNextMonth,
    onNextYear,
    onPrevYear,
    onPrevMonth,
    currentMonth,
    currentYear,
    isCurrentMonth,
  } = useCalendar();
  const { headerComponent: Header } = useComponents();
  const { breakpoint } = useBreakpoint();

  return (
    <Header
      isCurrentMonth={isCurrentMonth}
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
