import { DateConvertor, DisplaySize } from '@/types/index';

export const createDefaultConvertor = (): DateConvertor => {
  /** Map used to translate DisplaySize in to Intl day name format */
  const map = new Map<DisplaySize, 'long' | 'narrow' | 'short'>([
    [DisplaySize.large, 'long'],
    [DisplaySize.medium, 'short'],
    [DisplaySize.tiny, 'narrow'],
  ]);

  const getDaysOfWeek = (displaySize: DisplaySize) => {
    const formatter = new Intl.DateTimeFormat('en', {
      weekday: map.get(displaySize),
    });
    const days = [];
    for (let index = 0; index < 7; index++) {
      days.push(formatter.format(new Date(2012, 0, index + 1)));
    }
    return days;
  };

  const getCalendarViewInWeeks = (date: Date) => {
    throw Error('not implemented');
  };

  const getDayOfWeek = (date: Date) => date.getDay();

  const getMonthNameFromDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('en', {
      month: 'long',
    });
    return formatter.format(date);
  };

  const getYearFromDate = (date: Date) => date.getFullYear();

  const getDayNumberFromDate = (date: Date) => date.getDate();

  /** This comparison is easy, no need for a library */
  const areSameMonth = (firstDate: Date, secondDate: Date) =>
    getYearFromDate(firstDate) === getYearFromDate(secondDate) &&
    firstDate.getMonth() === secondDate.getMonth();

  /** This comparison is easy, no need for a library */
  const isDateToday = (date: Date) => {
    const today = new Date();
    return areSameMonth(date, today) && date.getDate() === today.getDate();
  };

  /** Manually construct ISO date so we don't have to import toIso */
  const toIso = (date: Date) => date.toISOString();

  const addMonthsToDate = (date: Date, amount: number) =>
    new Date(date.getFullYear(), date.getMonth() + amount, date.getDate());

  const subMonthsToDate = (date: Date, amount: number) =>
    addMonthsToDate(date, -amount);

  const areSameWeek = (firstDate: Date, secondDate: Date) => {
    throw Error('not implemented');
  };

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
