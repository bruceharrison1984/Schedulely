import { useCalendar } from '@/hooks/useCalendar';
import { useComponents } from '@/hooks/useComponents';

/**
 * This component controls the layout of the names of the days of the week at the top of the calendar
 * @returns DayOfWeekLayout Component
 */
export const DayOfWeekLayout = () => {
  const { daysOfWeek } = useCalendar();
  const { dayOfWeekComponent: DayOfWeek } = useComponents();

  return (
    <div className="day-of-week-layout">
      {/* We cheat a bit here and use the index as part of the key. This is because short day names can be identical. */}
      {daysOfWeek.map((dayOfWeek, idx) => (
        <div key={`${dayOfWeek}-${idx}`}>
          {/* wrap with extra div so we can control borders without touching the DayOfWeek component */}
          <DayOfWeek key={`${dayOfWeek}-${idx}`} dayName={dayOfWeek} />
        </div>
      ))}
    </div>
  );
};
