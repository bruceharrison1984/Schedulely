import {
  useActions,
  useCalendar,
  useComponents,
  useEventIntersection,
} from '@/hooks';

interface WeekLayoutProps {
  dates: Date[];
}

/**
 * This component controls the layout of an individual weeks worth of days
 * @returns WeekLayout Component
 */
export const WeekLayout = ({ dates }: WeekLayoutProps) => {
  const {
    dateAdapter: { isDateToday, isSameMonth, getDayNumber },
    currentDate,
  } = useCalendar();
  const { dayComponent: DayComponent } = useComponents();
  const { onMoreEventClick } = useActions();
  const { getEventsOnDate } = useEventIntersection();

  return (
    <div className="week-layout">
      {dates.map((day) => {
        const isToday = isDateToday(day);
        const events = getEventsOnDate(day);
        return (
          <div
            key={day.getDate()}
            data-day={day.getDate()}
            data-istoday={isToday ? true : undefined}
          >
            <DayComponent
              isCurrentMonth={isSameMonth(day, currentDate)}
              isToday={isToday}
              dateNumber={getDayNumber(day)}
              isOverflowed={events.filter((x) => !x.visible).length > 0}
              events={events}
              onClick={onMoreEventClick}
            />
          </div>
        );
      })}
    </div>
  );
};
