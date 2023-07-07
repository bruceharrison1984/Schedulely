import { DateTimeAdapter, WeekDay } from '@/types';

/**
 * Create an instance of the default date adapter
 * @param locale Locale override
 * @returns DateTimeAdapter
 */
export const createDefaultAdapter = (
  locale: string = 'en',
  firstDayOfWeek: WeekDay = WeekDay.Sunday
): DateTimeAdapter => {
  const getDaysOfWeek = (format?: 'long' | 'short' | 'narrow') => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: format,
    });

    if ((firstDayOfWeek as number) === -1) {
      throw new Error(
        "weekStartsOn should be one of: 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'"
      );
    }

    // this represents a week of days, with sunday being 0
    const weekDayArray = [0, 1, 2, 3, 4, 5, 6];

    // rotate array until start day lines up
    for (let i = 0; i < (firstDayOfWeek as number); i++) {
      weekDayArray.push(weekDayArray.shift()!);
    }
    return weekDayArray.map((x) => formatter.format(new Date(2012, 0, x + 1)));
  };

  /**
   * This function will return an array of arrays representing a month as a 6*7 data table. This includes leading/trailing days.
   *
   * This only uses native JS objects, so no external libs are needed
   *
   * It only iterates a single time, so it is highly performant
   * @param date The month/year of this Date object determines the calendar that will be generated.
   * @returns Date[][]
   */
  const getCalendarView = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    let leadingDaysDifferential = firstDayOfWeek - startOfMonth.getDay();
    if (leadingDaysDifferential > 0) {
      //invert the leading days so slack is evenly divided between top/bottom
      leadingDaysDifferential = -(7 - leadingDaysDifferential);
    }

    let dateIterator = new Date(
      startOfMonth.getFullYear(),
      startOfMonth.getMonth(),
      startOfMonth.getDate() + leadingDaysDifferential
    );

    const dates: Date[] = [dateIterator];
    // fixed sized for 6x7 calendar body
    for (let index = 0; index < 41; index++) {
      dateIterator = new Date(
        dateIterator.getFullYear(),
        dateIterator.getMonth(),
        dateIterator.getDate() + 1
      );
      dates.push(dateIterator);
    }

    const monthView = [...Array(Math.ceil(dates.length / 7))].map(() =>
      dates.splice(0, 7)
    );

    return monthView;
  };

  const getMonthName = (date: Date, format?: 'long' | 'short') => {
    const formatter = new Intl.DateTimeFormat(locale, {
      month: format,
    });
    return formatter.format(date);
  };

  const getYear = (date: Date) => date.getFullYear();

  const isSameMonth = (firstDate: Date, secondDate: Date) =>
    getYear(firstDate) === getYear(secondDate) &&
    firstDate.getMonth() === secondDate.getMonth();

  const isDateToday = (date: Date) => {
    const today = new Date();
    return isSameMonth(date, today) && date.getDate() === today.getDate();
  };

  const addMonthsToDate = (date: Date, amount: number) =>
    new Date(date.getFullYear(), date.getMonth() + amount, 1);

  const isEventInWeek = (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => {
    if (week.length !== 7) throw new Error('Week length must be 7');
    eventStartDate.setHours(0, 0, 0, 0); // zero time to avoid slight mismatches, bug potential high
    eventEndDate.setHours(0, 0, 0, 0); // zero time to avoid slight mismatches, bug potential high

    const eventStartInWeek =
      eventStartDate >= week[0] && eventStartDate <= week[6];
    const eventEndsInWeek = eventEndDate >= week[0] && eventEndDate <= week[6];
    const eventSpansWeek = eventStartDate <= week[0] && eventEndDate >= week[6];

    return eventSpansWeek || eventStartInWeek || eventEndsInWeek;
  };

  const convertIsoToDate = (isoDate: string) => new Date(isoDate);

  const isCurrentMonth = (date: Date) => {
    const currentMonth = new Date().getMonth();
    return date.getMonth() === currentMonth;
  };

  const isDateBetween = (targetDate: Date, dateOne: Date, dateTwo: Date) => {
    // set dates to midnight to avoid missing on half-days
    dateOne.setHours(0, 0, 0, 0);
    dateTwo.setHours(0, 0, 0, 0);
    return targetDate >= dateOne && targetDate <= dateTwo;
  };

  return {
    getCalendarView,
    getDaysOfWeek,
    getMonthName,
    getYear,
    isSameMonth,
    isDateToday,
    addMonthsToDate,
    isEventInWeek,
    convertIsoToDate,
    isCurrentMonth,
    isDateBetween,
    firstDayOfWeek,
  };
};
