import {
  CalendarEvent,
  CalendarState,
  DateTimeAdapter,
  InternalCalendarEvent,
  InternalEventWeek,
} from '@/types/index';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';

export const CalendarContext = createContext<CalendarState | null>(null);
CalendarContext.displayName = 'CalendarContext';

interface CalendarProviderProps {
  dateAdapter: DateTimeAdapter;
  initialDate: string;
  calendarEvents: CalendarEvent[];
  rootDiv: React.RefObject<HTMLDivElement>;
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
  rootDiv,
  children,
}: PropsWithChildren<CalendarProviderProps>) => {
  const [currentMonth, setCurrentMonth] = useState(
    dateAdapter.convertIsoToDate(initialDate)
  );
  const [rootDimensions, setRootDimensions] = useState<DOMRect | undefined>(
    rootDiv?.current?.getBoundingClientRect()
  );
  const [dayHeightPx, setDayHeightPx] = useState<number>();

  const screenSize = useScreenSize();

  const daysOfWeek = useMemo(
    () => dateAdapter.getDaysOfWeek(screenSize),
    [screenSize, dateAdapter]
  );

  const calendarView = useMemo(
    () => dateAdapter.getCalendarView(currentMonth),
    [currentMonth, dateAdapter]
  );

  useEffect(() => {
    if (rootDiv?.current) {
      const boundingBox = rootDiv?.current?.getBoundingClientRect();
      setRootDimensions(boundingBox);
      setDayHeightPx(boundingBox.height / calendarView.length);
      console.log(boundingBox.height / calendarView.length);
      console.log(boundingBox.height);
    }
  }, [setRootDimensions, rootDiv, calendarView]);

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
    daysOfWeek: daysOfWeek,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
    calendarWithEvents,
    calendarBoundingBox: rootDimensions,
    dayHeightPx,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
