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
      {dates.map((day) => (
        <div
          key={day.getDate()}
          data-day={day.getDate()}
          data-istoday={isDateToday(day) ? true : undefined}
        >
          <DayComponent
            isCurrentMonth={isSameMonth(day, currentDate)}
            isToday={isDateToday(day)}
            dateNumber={getDayNumber(day)}
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
