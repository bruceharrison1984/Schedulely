import { DateTimeAdapter, DisplaySize } from '@/types/index';
import {
  addDays,
  addMonths,
  getDay as df_getDay,
  getYear as df_getYear,
  isSameMonth as df_isSameMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isAfter,
  isBefore,
  isToday,
  isWithinInterval,
  parseISO,
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
    const monthEnd = endOfMonth(date);
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
    eachDayOfInterval({ start: date, end: endOfWeek(date) });

  const getDaysOfWeek = (displaySize: DisplaySize) => {
    const today = new Date();
    const weekDays = eachDayOfInterval({
      start: startOfWeek(today),
      end: endOfWeek(today),
    });

    let template = 'EEEE'; //default large
    if (displaySize == DisplaySize.medium) template = 'EE';
    if (displaySize == DisplaySize.tiny) template = 'EEEEE';

    return weekDays.map((day) => format(day, template));
  };

  const getMonthName = (date: Date) => format(date, 'MMMM');

  const getYear = (date: Date) => df_getYear(date);

  const getDayNumber = (date: Date) => getDate(date);

  const isSameMonth = (firstDate: Date, secondDate: Date) =>
    df_isSameMonth(firstDate, secondDate);

  const isDateToday = (date: Date) => isToday(date);

  const addMonthsToDate = (date: Date, amount: number) =>
    addMonths(date, amount);

  const getGridStartIndex = (eventDate: Date, startOfWeek: Date) =>
    isBefore(eventDate, startOfWeek) ? 1 : df_getDay(eventDate) + 1; //add one because css-grid isn't zero-index'd

  const getGridEndIndex = (eventEndDate: Date, endOfWeek: Date) =>
    isAfter(eventEndDate, endOfWeek) ? 8 : df_getDay(eventEndDate) + 2; //offset for zero-index, add additional so event ends at correct line

  const isEventInWeek = (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => {
    if (week.length !== 7) throw new Error('Week length must be 7');
    const weekInterval: Interval = {
      start: week[0],
      end: week[6],
    };
    const eventStartInWeek = isWithinInterval(eventStartDate, weekInterval);
    const eventEndsInWeek = isWithinInterval(eventEndDate, weekInterval);
    const eventSpansWeek =
      isBefore(eventStartDate, week[0]) && isAfter(eventEndDate, week[6]);
    return eventSpansWeek || eventStartInWeek || eventEndsInWeek;
  };

  const convertIsoToDate = (isoDate: string) => parseISO(isoDate);

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
