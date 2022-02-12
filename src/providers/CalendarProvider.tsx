import {
  CalendarEvent,
  CalendarState,
  DateConvertor,
  DayOfWeekNameFormat,
  EventWeek,
} from '@/types/index';
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

export const CalendarContext = createContext<CalendarState | null>(null);
CalendarContext.displayName = 'CalendarContext';

interface CalendarProviderProps {
  dateConvertor: DateConvertor;
  initialDate?: Date;
  calendarEvents: CalendarEvent[];
  children: ReactNode;
}

const sortByEventLength = (eventA: CalendarEvent, eventB: CalendarEvent) =>
  +eventA.end - +eventA.start - (+eventB.end - +eventB.start);

const sortByEventStart = (eventA: CalendarEvent, eventB: CalendarEvent) =>
  +eventA.start - +eventB.start;

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

  const isMediumDisplay = useMediaQuery(
    '(max-width: 768px) and (min-width: 481px)'
  );
  const isTinyDisplay = useMediaQuery('(max-width: 480px)');

  const dayOffset = useMemo(() => {
    const offset = dateConvertor.getDayOfWeek(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    );
    return offset;
  }, [currentMonth, dateConvertor]);

  //TODO: This is implementation specific to date-fns format
  const daysOfWeek = useMemo(() => {
    let format = DayOfWeekNameFormat.long;
    if (isTinyDisplay) format = DayOfWeekNameFormat.short;
    if (isMediumDisplay) format = DayOfWeekNameFormat.medium;

    return dateConvertor.getDaysOfWeek(format);
  }, [isMediumDisplay, isTinyDisplay, dateConvertor]);

  const weeksInMonth = useMemo(
    () => dateConvertor.getCalendarViewInWeeks(currentMonth),
    [currentMonth, dateConvertor]
  );

  //TODO: This needs to be refactored to account for sibling month days
  const events = useMemo(
    () =>
      calendarEvents
        .filter(
          (event) =>
            dateConvertor.areSameMonth(event.start, currentMonth) ||
            dateConvertor.areSameMonth(event.end, currentMonth)
        )
        .sort((a, b) => sortByEventStart(a, b) && sortByEventLength(a, b)), //unary operator so we can easily compare
    [currentMonth, calendarEvents, dateConvertor]
  );

  const calendarWithEvents = useMemo<EventWeek[]>(
    () =>
      weeksInMonth.map<EventWeek>((week) => ({
        weekStart: week[0],
        weekEnd: week[7],
        daysInWeek: week,
        events: events.filter(
          (event) =>
            dateConvertor.areSameWeek(event.start, week[0]) ||
            dateConvertor.areSameWeek(event.end, week[0])
        ),
      })),
    [weeksInMonth, events, dateConvertor]
  );

  const onNextMonth = useCallback(
    () => setCurrentMonth((month) => dateConvertor.addMonthsToDate(month, 1)),
    [dateConvertor]
  );

  const onPrevMonth = useCallback(
    () => setCurrentMonth((month) => dateConvertor.subMonthsToDate(month, 1)),
    [dateConvertor]
  );

  const contextValue: CalendarState = {
    currentMonth,
    dateConvertor,
    daysOfWeek: daysOfWeek,
    onNextMonth,
    onPrevMonth,
    calendarWithEvents,
    dayOffset,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
