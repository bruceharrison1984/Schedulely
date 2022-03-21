import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { useCalendar, useComponents } from '@/hooks/index';

interface WeekLayoutProps {
  dates: Date[];
  eventsOnDays: { date: Date; events: InternalCalendarEvent[] }[];
}

/**
 * This component controls the layout of an individual weeks worth of days
 * @returns WeekLayout Component
 */
export const WeekLayout = ({ dates, eventsOnDays }: WeekLayoutProps) => {
  const { dateAdapter, currentMonth } = useCalendar();

  const { dayComponent: DayComponent, dayHeaderComponent: DayHeader } =
    useComponents();

  /** Display 'more events' indicator */
  const hasEventOverflow = (date: Date, overflowLimit = 3) => {
    const events = eventsOnDays.find((x) => x.date === date)?.events;
    if (!events) return false;
    if (events.length > overflowLimit) return true;
  };

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
          {hasEventOverflow(day) && (
            <div
              className="calendo--additional-events"
              title="More events"
              onClick={() =>
                console.log(eventsOnDays.find((x) => x.date === day))
              }
            >
              . . .
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
