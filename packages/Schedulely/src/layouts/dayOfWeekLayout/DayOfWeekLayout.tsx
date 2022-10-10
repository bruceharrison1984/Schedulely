import { useCalendar } from '@/hooks/useCalendar';
import useResizeObserver from '@/hooks/useResizeObserver';

/**
 * This component controls the layout of the names of the days of the week at the top of the calendar
 * @returns DayOfWeekLayout Component
 */
export const DayOfWeekLayout = () => {
  const { getDaysOfWeek } = useCalendar();
  const { observedRef, breakSize } = useResizeObserver();

  return (
    <div className="day-of-week-layout" ref={observedRef}>
      {/* We cheat a bit here and use the index as part of the key. This is because short day names can be identical. */}
      {getDaysOfWeek(breakSize).map((dayOfWeek, idx) => (
        <div key={`${dayOfWeek}-${idx}`}>
          {/* wrap with extra div so we can control borders without touching the DayOfWeek component */}
          <div className="default-day-of-week">{dayOfWeek}</div>
        </div>
      ))}
    </div>
  );
};
