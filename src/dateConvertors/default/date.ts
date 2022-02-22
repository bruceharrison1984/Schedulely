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
    while (iteratedDate.getMonth() === startOfMonth.getMonth()) {
      currentMonth.push(iteratedDate);
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() + 1
      );
    }

    iteratedDate = endOfMonth;
    while (iteratedDate.getDay() + 1 !== 7) {
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

    return [...Array(Math.ceil(flatMonthView.length / 7))].map(() =>
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

  const areSameMonth = (firstDate: Date, secondDate: Date) =>
    getYearFromDate(firstDate) === getYearFromDate(secondDate) &&
    firstDate.getMonth() === secondDate.getMonth();

  const isDateToday = (date: Date) => {
    const today = new Date();
    return areSameMonth(date, today) && date.getDate() === today.getDate();
  };

  const addMonthsToDate = (date: Date, amount: number) =>
    new Date(date.getFullYear(), date.getMonth() + amount, 1);

  const subMonthsToDate = (date: Date, amount: number) =>
    new Date(date.getFullYear(), date.getMonth() - amount, 1);

  const _getOrdinalWeek = (date: Date) => {
    const firstOfYear = new Date(date.getFullYear(), 0, 1);
    const dateDiff = date.valueOf() - firstOfYear.valueOf();
    const numberOfDays = dateDiff / (24 * 60 * 60 * 1000);
    return Math.ceil(numberOfDays / 7);
  };

  const areSameWeek = (firstDate: Date, secondDate: Date) =>
    _getOrdinalWeek(firstDate) === _getOrdinalWeek(secondDate);

  const getStartIndex = (eventDate: Date, startOfWeek: Date) =>
    eventDate <= startOfWeek ? 1 : eventDate.getDay() + 1; //add one because css-grid isn't zero-index'd

  const getEndIndex = (eventEndDate: Date, endOfWeek: Date) => {
    if (eventEndDate > endOfWeek) return 8;
    const end = eventEndDate.getDay() + 2; // add two because css-grid isn't zero index'd, and it goes to 8
    return end;
  };

  const eventFallsWithinWeek = (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => {
    if (week.length !== 7) throw new Error('Week length must be 7');
    return (
      (eventStartDate <= week[0] && eventEndDate >= week[6]) ||
      areSameWeek(eventStartDate, week[0]) ||
      areSameWeek(eventEndDate, week[6])
    );
  };

  return {
    getCalendarViewInWeeks,
    getDaysOfWeek,
    getMonthNameFromDate,
    getYearFromDate,
    getDayNumberFromDate,
    areSameMonth,
    isDateToday,
    addMonthsToDate,
    subMonthsToDate,
    areSameWeek,
    getEndIndex,
    getStartIndex,
    eventFallsWithinWeek,
  };
};
