import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { useCalendar, useComponents } from '@/hooks/index';

interface WeekLayoutProps {
  dates: Date[];
  eventsOnDays: { [x: string]: InternalCalendarEvent[] }[];
}

/**
 * This component controls the layout of an individual weeks worth of days
 * @returns WeekLayout Component
 */
export const WeekLayout = ({ dates, eventsOnDays }: WeekLayoutProps) => {
  const { dateAdapter, currentMonth } = useCalendar();

  const { dayComponent: DayComponent, dayHeaderComponent: DayHeader } =
    useComponents();
  console.log(eventsOnDays);
  return (
    <div className="calendo--week-layout">
      {dates.map((day) => (
        <div
          key={day.getDate()}
          data-day={day.getDate()}
          data-istoday={dateAdapter.isDateToday(day) ? true : undefined}
        >
          <DayComponent
            isCurrentMonth={dateAdapter.isSameMonth(day, currentMonth)}
          >
            <DayHeader
              isToday={dateAdapter.isDateToday(day)}
              dateNumber={dateAdapter.getDayNumber(day)}
            />
          </DayComponent>
          <div
            style={{
              display: 'block',
              position: 'relative',
              bottom: '3px',
              cursor: 'pointer',
              zIndex: 100,
            }}
            onClick={() => console.log(eventsOnDays[day.toISOString()])}
          >
            ...
          </div>
        </div>
      ))}
    </div>
  );
};
