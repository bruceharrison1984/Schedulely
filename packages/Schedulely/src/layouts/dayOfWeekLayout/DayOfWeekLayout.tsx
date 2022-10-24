import { useBreakpoint, useCalendar } from '@/hooks';

/**
 * This component controls the layout of the names of the days of the week at the top of the calendar
 * @returns DayOfWeekLayout Component
 */
export const DayOfWeekLayout = () => {
  const { getDaysOfWeek } = useCalendar();
  const { breakpoint } = useBreakpoint();

  return (
    <div className="day-of-week-layout">
      {/* We cheat a bit here and use the index as part of the key. This is because short day names can be identical. */}
      {getDaysOfWeek(breakpoint).map((dayOfWeek, idx) => (
        <div key={`${dayOfWeek}-${idx}`}>
          {/* wrap with extra div so we can control borders without touching the DayOfWeek component */}
          <span className="default-day-of-week">{dayOfWeek}</span>
        </div>
      ))}
    </div>
  );
};
