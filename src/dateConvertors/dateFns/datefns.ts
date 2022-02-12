import { DateConvertor, DayOfWeekNameFormat } from '@/types/index';
import { DateFnsFunctions } from './datefnsInterface';

/**
 * Create a NextMonth compatible DateConvertor from date-fns.
 */
export const createDateFnsConvertor = (
  datefns: DateFnsFunctions
): DateConvertor => {
  const {
    addDays,
    addMonths,
    eachDayOfInterval,
    eachWeekOfInterval,
    format,
    startOfMonth,
    startOfWeek,
    isSameWeek,
    getWeek,
  } = datefns;

  /** Use some creative math to avoid importing more than we need to */
  const _endOfWeek = (date: Date) => addDays(startOfWeek(date), 6);

  /** Use some creative math to avoid importing more than we need to */
  const _endOfMonth = (date: Date) =>
    addDays(startOfMonth(addMonthsToDate(date, 1)), -1);

  const _getCalendarRangeForDate = (date: Date) => {
    const monthStart = startOfMonth(date);
    const startDayOfWeek = monthStart.getDay();
    const monthEnd = _endOfMonth(date);
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

  const getCalendarViewInWeeks = (date: Date) =>
    _getWeeksInMonth(date).map((week) => _getDaysInWeek(week));

  const _getDaysInWeek = (date: Date) =>
    eachDayOfInterval({ start: date, end: _endOfWeek(date) });

  const getDaysOfWeek = (dayOfWeekFormat?: DayOfWeekNameFormat) => {
    const today = new Date();
    const weekDays = eachDayOfInterval({
      start: startOfWeek(today),
      end: _endOfWeek(today),
    });
    return weekDays.map((day) => format(day, dayOfWeekFormat || 'EEE'));
  };

  const getDayOfWeek = (date: Date) => parseInt(format(date, 'i'));

  const getMonthNameFromDate = (date: Date) => format(date, 'MMMM');

  const getYearFromDate = (date: Date) => parseInt(format(date, 'yyyy'));

  const getDayNumberFromDate = (date: Date) => parseInt(format(date, 'dd'));

  /** This comparison is easy, no need for a library */
  const areSameMonth = (firstDate: Date, secondDate: Date) =>
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth();

  /** This comparison is easy, no need for a library */
  const isDateToday = (date: Date) => {
    const today = new Date();
    return areSameMonth(date, today) && date.getDate() === today.getDate();
  };

  /** Manually construct ISO date so we don't have to import toIso */
  const toIso = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");

  const addMonthsToDate = (date: Date, amount: number) =>
    addMonths(date, amount);

  const subMonthsToDate = (date: Date, amount: number) =>
    addMonths(date, -amount);

  const areSameWeek = (firstDate: Date, secondDate: Date) =>
    isSameWeek(firstDate, secondDate);

  return {
    getCalendarViewInWeeks,
    getDaysOfWeek,
    getMonthNameFromDate,
    getYearFromDate,
    getDayNumberFromDate,
    areSameMonth,
    isDateToday,
    toIso,
    addMonthsToDate,
    subMonthsToDate,
    getDayOfWeek,
    areSameWeek,
  };
};
