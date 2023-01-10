import {
  CalendarContextState,
  CalendarEvent,
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
import { useActions } from '@/hooks/useActions';
import { useBreakpoint } from '@/hooks/useBreakpoint';

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
  const { breakpoint } = useBreakpoint();

  const [currentDate, setCurrentDate] = useState(
    dateAdapter.convertIsoToDate(initialDate)
  );

  const currentMonth = useMemo(() => {
    let format: 'long' | 'short' = 'long';
    if (breakpoint === 'small') format = 'short';
    return dateAdapter.getMonthName(currentDate, format);
  }, [currentDate, breakpoint]);

  const currentYear = useMemo(
    () => dateAdapter.getYear(currentDate),
    [currentDate]
  );

  const isCurrentMonth = useMemo(
    () => dateAdapter.isCurrentMonth(currentDate),
    [currentDate]
  );

  // Does this need memo?
  const daysOfWeek = useMemo(() => {
    let format: 'long' | 'short' | 'narrow' = 'long';
    if (breakpoint === 'medium') format = 'short';
    if (breakpoint === 'small') format = 'narrow';
    return dateAdapter.getDaysOfWeek(format);
  }, [breakpoint]);

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

  useEffect(() => {
    const firstDateInView = calendarView[0][0];
    const lastDateInView =
      calendarView[calendarView.length - 1][
        calendarView[calendarView.length - 1].length - 1
      ];
    onMonthChangeClick(firstDateInView, lastDateInView);
  }, [onMonthChangeClick, calendarView]);

  const calendarWithEvents = useMemo<InternalEventWeek[]>(
    () =>
      calendarView.map<InternalEventWeek>((week) => ({
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
    isCurrentMonth,
    daysOfWeek,
    calendarWithEvents,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
