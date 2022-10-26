import {
  CalendarContextState,
  CalendarEvent,
  ComponentSize,
  DateTimeAdapter,
  InternalCalendarEvent,
  InternalEventWeek,
} from '@/types';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useActions } from '@/hooks';

export const CalendarContext = createContext<CalendarContextState | null>(null);
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
  const { onMonthChangeClick } = useActions();

  const [currentDate, setCurrentDate] = useState(
    dateAdapter.convertIsoToDate(initialDate)
  );

  const currentMonth = useMemo(
    () => dateAdapter.getMonthName(currentDate),
    [currentDate]
  );

  const currentYear = useMemo(
    () => dateAdapter.getYear(currentDate),
    [currentDate]
  );

  const isCurrentMonth = useMemo(
    () => dateAdapter.isCurrentMonth(currentDate),
    [currentDate]
  );

  const getDaysOfWeek = useCallback(
    (componentSize: ComponentSize) => dateAdapter.getDaysOfWeek(componentSize),
    [dateAdapter]
  );

  const calendarView = useMemo(
    () => dateAdapter.getCalendarView(currentDate),
    [currentDate, dateAdapter]
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
            visible: true,
          };
          return internalEvent;
        })
        .filter(
          (event) =>
            dateAdapter.isSameMonth(event.start, currentDate) ||
            dateAdapter.isSameMonth(event.end, currentDate)
        ),
    [currentDate, calendarEvents, dateAdapter]
  );

  const firstDateInView = useMemo(() => calendarView[0][0], [calendarView]);
  const lastDateInView = useMemo(
    () =>
      calendarView[calendarView.length - 1][
        calendarView[calendarView.length - 1].length - 1
      ],
    [calendarView]
  );

  useEffect(() => {
    onMonthChangeClick(firstDateInView, lastDateInView);
  }, [firstDateInView, lastDateInView]);

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
    () => setCurrentDate((month) => dateAdapter.addMonthsToDate(month, 1)),
    [dateAdapter]
  );

  const onNextYear = useCallback(
    () => setCurrentDate((month) => dateAdapter.addMonthsToDate(month, 12)),
    [dateAdapter]
  );

  const onPrevMonth = useCallback(
    () => setCurrentDate((month) => dateAdapter.addMonthsToDate(month, -1)),
    [dateAdapter]
  );

  const onPrevYear = useCallback(
    () => setCurrentDate((month) => dateAdapter.addMonthsToDate(month, -12)),
    [dateAdapter]
  );

  const contextValue: CalendarContextState = {
    currentDate,
    currentMonth,
    currentYear,
    dateAdapter,
    firstDateInView,
    lastDateInView,
    isCurrentMonth,
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
