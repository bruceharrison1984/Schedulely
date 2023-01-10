import {
  useActions,
  useCalendar,
  useComponents,
  useEventIntersection,
} from '@/hooks';

export interface WeekLayoutProps {
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
  const { onMoreEventsClick, onDayClick } = useActions();
  const { getEventsOnDate } = useEventIntersection();

  return (
    <div className="week-layout">
      {dates.map((day) => {
        const isToday = isDateToday(day);
        const events = getEventsOnDate(day);
        const date = day.getDate();

        return (
          <div key={date} data-day={date} data-istoday={isToday}>
            <DayComponent
              isCurrentMonth={isSameMonth(day, currentDate)}
              isToday={isToday}
              isOverflowed={events.filter((x) => !x.visible).length > 0}
              events={events}
              onMoreEventsClick={onMoreEventsClick}
              onDayClick={onDayClick}
              date={day}
            />
          </div>
        );
      })}
    </div>
  );
};
