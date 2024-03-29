import { useCalendar } from '@/hooks';

/**
 * This component controls the layout of the names of the days of the week at the top of the calendar
 * @returns DayOfWeekLayout Component
 */
export const DayOfWeekLayout = () => {
  const { daysOfWeek } = useCalendar();

  return (
    <div className="day-of-week-layout">
      {/* We cheat a bit here and use the index as part of the key. This is because short day names can be identical. */}
      {daysOfWeek.map((dayOfWeek, idx) => (
        <div key={`${dayOfWeek}-${idx}`} className="default-day-of-week">
          {dayOfWeek}
        </div>
      ))}
    </div>
  );
};
