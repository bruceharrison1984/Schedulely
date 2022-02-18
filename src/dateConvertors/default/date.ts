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
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const finalsOfPrevMonth = [];
    const currentMonth = [];
    const startsOfNextMonth = [];

    let iteratedDate = startOfMonth;
    while (iteratedDate.getDay() !== 0) {
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() - 1
      );
      finalsOfPrevMonth.push(iteratedDate);
    }

    iteratedDate = startOfMonth;
    while (iteratedDate.getMonth() !== startOfMonth.getMonth() + 1) {
      currentMonth.push(iteratedDate);
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() + 1
      );
    }

    iteratedDate = endOfMonth;
    while (
      finalsOfPrevMonth.length +
        currentMonth.length +
        startsOfNextMonth.length <
      42
    ) {
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() + 1
      );
      startsOfNextMonth.push(iteratedDate);
    }

    const flatMonthView = [
      ...finalsOfPrevMonth.reverse(),
      ...currentMonth,
      ...startsOfNextMonth,
    ];

    return [...Array(Math.ceil(flatMonthView.length / 7))].map((_) =>
      flatMonthView.splice(0, 7)
    );
  };

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

  const _getOrdinalWeek = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((+date - +oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  };

  const areSameWeek = (firstDate: Date, secondDate: Date) =>
    _getOrdinalWeek(firstDate) === _getOrdinalWeek(secondDate);

  const getDayOfWeek = (date: Date) => date.getDay();

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
    areSameWeek,
    getDayOfWeek,
  };
};
