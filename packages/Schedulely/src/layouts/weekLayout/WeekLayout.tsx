import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { useActions } from '@/hooks/useActions';
import {
  useCalendar,
  useComponents,
  useEventIntersection,
} from '@/hooks/index';

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
  const { dayComponent: DayComponent } = useComponents();
  const { onMoreEventClick } = useActions();
  const { getEventsOnDate } = useEventIntersection();

  return (
    <div className="week-layout">
      {dates.map((day) => (
        <div
          key={day.getDate()}
          data-day={day.getDate()}
          data-istoday={dateAdapter.isDateToday(day) ? true : undefined}
        >
          <DayComponent
            isCurrentMonth={dateAdapter.isSameMonth(day, currentMonth)}
            isToday={dateAdapter.isDateToday(day)}
            dateNumber={dateAdapter.getDayNumber(day)}
            isOverflowed={
              getEventsOnDate(day).filter((x) => !x.visible).length > 0
            }
            events={getEventsOnDate(day)}
            onClick={onMoreEventClick}
          />
        </div>
      ))}
    </div>
  );
};
