import {
  CalendarEvent,
  CalendarState,
  DateTimeAdapter,
  EventWeek,
  InternalCalendarEvent,
} from '@/types/index';
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import useScreenSize from '@/hooks/useScreenSize';

export const CalendarContext = createContext<CalendarState | null>(null);
CalendarContext.displayName = 'CalendarContext';

interface CalendarProviderProps {
  dateAdapter: DateTimeAdapter;
  initialDate?: Date;
  calendarEvents: CalendarEvent[];
  children: ReactNode;
}

/**
 * The provides access to data and behaviors that control the calendar
 * @param param0 CalendarProviderProps
 * @returns CalendarContext.Provider component
 */
export const CalendarProvider = ({
  dateAdapter,
  initialDate = new Date(),
  calendarEvents,
  children,
}: CalendarProviderProps) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const screenSize = useScreenSize();

  const daysOfWeek = useMemo(
    () => dateAdapter.getDaysOfWeek(screenSize),
    [screenSize, dateAdapter]
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

  const calendarWithEvents = useMemo<EventWeek[]>(
    () =>
      calendarView.map<EventWeek>((week) => ({
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

  const onPrevMonth = useCallback(
    () => setCurrentMonth((month) => dateAdapter.addMonthsToDate(month, -1)),
    [dateAdapter]
  );

  const contextValue: CalendarState = {
    currentMonth,
    dateAdapter: dateAdapter,
    daysOfWeek: daysOfWeek,
    onNextMonth,
    onPrevMonth,
    calendarWithEvents,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
