import { DateFnsFunctions } from './datefnsInterface';
import { DateTimeAdapter, DisplaySize } from '@/types/index';

/**
 * Create a Schedulely compatible DateConvertor from date-fns.
 */
export const createDateFnsConvertor = (
  datefns: DateFnsFunctions
): DateTimeAdapter => {
  const {
    addDays,
    addMonths,
    eachDayOfInterval,
    eachWeekOfInterval,
    format,
    startOfMonth,
    startOfWeek,
  } = datefns;

  // This returns the ISO day - Mon: 1 / Sun: 7
  const _getDayOfWeek = (date: Date) => parseInt(format(date, 'i'));

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

  const getCalendarView = (date: Date) =>
    _getWeeksInMonth(date).map((week) => _getDaysInWeek(week));

  const _getDaysInWeek = (date: Date) =>
    eachDayOfInterval({ start: date, end: _endOfWeek(date) });

  const getDaysOfWeek = (displaySize: DisplaySize) => {
    const today = new Date();
    const weekDays = eachDayOfInterval({
      start: startOfWeek(today),
      end: _endOfWeek(today),
    });

    let template = 'EEEE'; //default large
    if (displaySize == DisplaySize.medium) template = 'EE';
    if (displaySize == DisplaySize.tiny) template = 'EEEEE';

    return weekDays.map((day) => format(day, template));
  };

  const getMonthName = (date: Date) => format(date, 'MMMM');

  const getYear = (date: Date) => parseInt(format(date, 'yyyy'));

  const getDayNumber = (date: Date) => parseInt(format(date, 'dd'));

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
    eventDate <= startOfWeek ? 1 : _getDayOfWeek(eventDate) + 1;

  const getGridEndIndex = (eventEndDate: Date, endOfWeek: Date) => {
    if (eventEndDate >= endOfWeek) return 8;
    const end = _getDayOfWeek(eventEndDate) + 2; //offset for zero-index, add additional so event ends at correct line
    return end;
  };

  const isEventInWeek = (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => {
    throw new Error('not implemented');
  };

  const convertIsoToDate = (isoDate: string) => {
    throw new Error('not implemented');
  };

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
