import {
  CalendarEvent,
  CalendarState,
  DateTimeAdapter,
  InternalCalendarEvent,
  InternalEventWeek,
} from '@/types/index';
import { ComponentSize } from '@/types/ComponentSize';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

export const CalendarContext = createContext<CalendarState | null>(null);
CalendarContext.displayName = 'CalendarContext';

interface CalendarProviderProps {
  dateAdapter: DateTimeAdapter;
  initialDate: string;
  calendarEvents: CalendarEvent[];
}

/**
 * The provides access to data and behaviors that control the calendar
 * @param param0 CalendarProviderProps
 * @returns CalendarContext.Provider component
 */
export const CalendarProvider = ({
  dateAdapter,
  initialDate,
  calendarEvents,
  children,
}: PropsWithChildren<CalendarProviderProps>) => {
  const [currentMonth, setCurrentMonth] = useState(
    dateAdapter.convertIsoToDate(initialDate)
  );

  const getDaysOfWeek = useCallback(
    (componentSize: ComponentSize) => dateAdapter.getDaysOfWeek(componentSize),
    [dateAdapter]
  );

  const calendarView = useMemo(
    () => dateAdapter.getCalendarView(currentMonth),
    [currentMonth, dateAdapter]
  );

  const events = useMemo(
    () =>
      calendarEvents
        .map((x) => {
          const internalEvent: InternalCalendarEvent = {
            start: dateAdapter.convertIsoToDate(x.start),
            end: dateAdapter.convertIsoToDate(x.end),
            color: x.color,
            id: x.id,
            summary: x.summary,
          };
          return internalEvent;
        })
        .filter(
          (event) =>
            dateAdapter.isSameMonth(event.start, currentMonth) ||
            dateAdapter.isSameMonth(event.end, currentMonth)
        ),
    [currentMonth, calendarEvents, dateAdapter]
  );

  const calendarWithEvents = useMemo<InternalEventWeek[]>(
    () =>
      calendarView.map<InternalEventWeek>((week) => ({
        weekStart: week[0],
        weekEnd: week[6],
        daysInWeek: week,
        events: events.filter((event) =>
          dateAdapter.isEventInWeek(event.start, event.end, week)
        ),
        eventsOnDays: week.map((day) => ({
          date: day,
          events: events.filter(
            (event) => event.start <= day && event.end >= day
          ),
        })),
      })),
    [calendarView, events, dateAdapter]
  );

  const onNextMonth = useCallback(
    () => setCurrentMonth((month) => dateAdapter.addMonthsToDate(month, 1)),
    [dateAdapter]
  );

  const onNextYear = useCallback(
    () => setCurrentMonth((month) => dateAdapter.addMonthsToDate(month, 12)),
    [dateAdapter]
  );

  const onPrevMonth = useCallback(
    () => setCurrentMonth((month) => dateAdapter.addMonthsToDate(month, -1)),
    [dateAdapter]
  );

  const onPrevYear = useCallback(
    () => setCurrentMonth((month) => dateAdapter.addMonthsToDate(month, -12)),
    [dateAdapter]
  );

  const contextValue: CalendarState = {
    currentMonth,
    dateAdapter: dateAdapter,
    getDaysOfWeek,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
    calendarWithEvents,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
