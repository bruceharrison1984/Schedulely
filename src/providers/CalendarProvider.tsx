import {
  CalendarEvent,
  CalendarState,
  DateConvertor,
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
  dateConvertor: DateConvertor;
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
  dateConvertor,
  initialDate = new Date(),
  calendarEvents,
  children,
}: CalendarProviderProps) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const screenSize = useScreenSize();

  const daysOfWeek = useMemo(
    () => dateConvertor.getDaysOfWeek(screenSize),
    [screenSize, dateConvertor]
  );

  const calendarView = useMemo(
    () => dateConvertor.getCalendarView(currentMonth),
    [currentMonth, dateConvertor]
  );

  const events = useMemo(
    () =>
      calendarEvents
        .map((x) => {
          const internalEvent: InternalCalendarEvent = {
            start: new Date(x.start),
            end: new Date(x.end),
            color: x.color,
            id: x.id,
            summary: x.summary,
          };
          return internalEvent;
        })
        .filter(
          (event) =>
            dateConvertor.isSameMonth(event.start, currentMonth) ||
            dateConvertor.isSameMonth(event.end, currentMonth)
        ),
    [currentMonth, calendarEvents, dateConvertor]
  );

  const calendarWithEvents = useMemo<EventWeek[]>(
    () =>
      calendarView.map<EventWeek>((week) => ({
        weekStart: week[0],
        weekEnd: week[6],
        daysInWeek: week,
        events: events.filter((event) =>
          dateConvertor.isEventInWeek(event.start, event.end, week)
        ),
      })),
    [calendarView, events, dateConvertor]
  );

  const onNextMonth = useCallback(
    () => setCurrentMonth((month) => dateConvertor.addMonthsToDate(month, 1)),
    [dateConvertor]
  );

  const onPrevMonth = useCallback(
    () => setCurrentMonth((month) => dateConvertor.addMonthsToDate(month, -1)),
    [dateConvertor]
  );

  const contextValue: CalendarState = {
    currentMonth,
    dateConvertor,
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
