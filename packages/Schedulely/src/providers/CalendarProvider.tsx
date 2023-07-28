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
  }, [currentDate, breakpoint, dateAdapter]);

  const currentYear = useMemo(
    () => dateAdapter.getYear(currentDate),
    [currentDate, dateAdapter]
  );

  const isCurrentMonth = useMemo(
    () => dateAdapter.isCurrentMonth(currentDate),
    [currentDate, dateAdapter]
  );

  const daysOfWeek = useMemo(() => {
    let format: 'long' | 'short' | 'narrow' = 'long';
    if (breakpoint === 'medium') format = 'short';
    if (breakpoint === 'small') format = 'narrow';
    return dateAdapter.getDaysOfWeek(format);
  }, [breakpoint, dateAdapter]);

  const calendarView = useMemo(
    () => dateAdapter.getCalendarView(currentDate),
    [currentDate, dateAdapter]
  );

  const events = useMemo(
    () =>
      calendarEvents
        .map(({ start, end, color, id, summary, data }) => {
          const internalEvent: InternalCalendarEvent = {
            start: dateAdapter.convertIsoToDate(start),
            end: dateAdapter.convertIsoToDate(end),
            color,
            id,
            summary,
            visible: false,
            data,
          };
          return internalEvent;
        })
        .filter(
          (event) =>
            dateAdapter.isDateBetween(
              event.start,
              calendarView[0][0],
              calendarView[5][6]
            ) ||
            dateAdapter.isDateBetween(
              event.end,
              calendarView[0][0],
              calendarView[5][6]
            )
        ),
    [calendarEvents, dateAdapter, calendarView]
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
        events: events
          .filter((event) =>
            dateAdapter.isEventInWeek(event.start, event.end, week)
          )
          .sort(
            (x, y) =>
              x.end.valueOf() -
              x.start.valueOf() -
              (y.end.valueOf() - y.end.valueOf())
          ),
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
