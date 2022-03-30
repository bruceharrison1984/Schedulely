import { DateTimeAdapter, DisplaySize } from '@/types/index';
import {
  addDays,
  addMonths,
  endOfMonth as df_endOfMonth,
  endOfWeek as df_endOfWeek,
  getDate as df_getDate,
  getDay as df_getDay,
  getYear as df_getYear,
  parseISO as df_parseISO,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

/**
 * Create a Schedulely compatible DateAdapter from date-fns.
 */
export const createDateFnsAdapter = (): DateTimeAdapter => {
  const _getCalendarRangeForDate = (date: Date) => {
    const monthStart = startOfMonth(date);
    const startDayOfWeek = monthStart.getDay();
    const monthEnd = df_endOfMonth(date);
    const endDayOfWeek = monthEnd.getDay();

    // subtract leading days so a full row fits
    const start = addDays(monthStart, -startDayOfWeek);
    // add trailing days until a full row fits
    const end = addDays(monthEnd, 6 - endDayOfWeek);

    return { start, end };
  };

  const _getWeeksInMonth = (date: Date) => {
    return eachWeekOfInterval(_getCalendarRangeForDate(date));
  };

  const getCalendarView = (date: Date) =>
    _getWeeksInMonth(date).map((week) => _getDaysInWeek(week));

  const _getDaysInWeek = (date: Date) =>
    eachDayOfInterval({ start: date, end: df_endOfWeek(date) });

  const getDaysOfWeek = (displaySize: DisplaySize) => {
    const today = new Date();
    const weekDays = eachDayOfInterval({
      start: startOfWeek(today),
      end: df_endOfWeek(today),
    });

    let template = 'EEEE'; //default large
    if (displaySize == DisplaySize.medium) template = 'EE';
    if (displaySize == DisplaySize.tiny) template = 'EEEEE';

    return weekDays.map((day) => format(day, template));
  };

  const getMonthName = (date: Date) => format(date, 'MMMM');

  const getYear = (date: Date) => df_getYear(date);

  const getDayNumber = (date: Date) => df_getDate(date);

  /** This comparison is easy, no need for a library */
  const isSameMonth = (firstDate: Date, secondDate: Date) =>
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth();

  /** This comparison is easy, no need for a library */
  const isDateToday = (date: Date) => {
    const today = new Date();
    return isSameMonth(date, today) && date.getDate() === today.getDate();
  };

  const addMonthsToDate = (date: Date, amount: number) =>
    addMonths(date, amount);

  const getGridStartIndex = (eventDate: Date, startOfWeek: Date) =>
    eventDate <= startOfWeek ? 1 : df_getDay(eventDate) + 1;

  const getGridEndIndex = (eventEndDate: Date, endOfWeek: Date) => {
    if (eventEndDate >= endOfWeek) return 8;
    const end = df_getDay(eventEndDate) + 2; //offset for zero-index, add additional so event ends at correct line
    return end;
  };

  const isEventInWeek = (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => {
    if (week.length !== 7) throw new Error('Week length must be 7');
    const eventStartInWeek =
      eventStartDate >= week[0] && eventStartDate <= week[6];
    const eventEndsInWeek = eventEndDate >= week[0] && eventEndDate <= week[6];
    const eventSpansWeek = eventStartDate <= week[0] && eventEndDate >= week[6];
    return eventSpansWeek || eventStartInWeek || eventEndsInWeek;
  };

  const convertIsoToDate = (isoDate: string) => df_parseISO(isoDate);

  return {
    getCalendarView,
    getDaysOfWeek,
    getMonthName,
    getYear,
    getDayNumber,
    isSameMonth,
    isDateToday,
    addMonthsToDate,
    getGridStartIndex,
    getGridEndIndex,
    isEventInWeek,
    convertIsoToDate,
  };
};
