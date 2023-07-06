import { DateTimeAdapter, WeekDay } from '@/types';

/**
 * Create an instance of the default date adapter
 * @param locale Locale override
 * @returns DateTimeAdapter
 */
export const createDefaultAdapter = (
  locale: string = 'en',
  dayWeekStartsOn: WeekDay = WeekDay.Sunday
): DateTimeAdapter => {
  const getDaysOfWeek = (format?: 'long' | 'short' | 'narrow') => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: format,
    });

    if ((dayWeekStartsOn as number) === -1) {
      throw new Error(
        "weekStartsOn should be one of: 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'"
      );
    }

    // this represents a week of days, with sunday being 0
    const weekDayArray = [0, 1, 2, 3, 4, 5, 6];

    // rotate array until start day lines up
    for (let i = 0; i < (dayWeekStartsOn as number); i++) {
      weekDayArray.push(weekDayArray.shift()!);
    }

    return weekDayArray.map((x) => formatter.format(new Date(2012, 0, x + 1)));
  };

  /**
   * This function will return an array of arrays representing a month, split into weeks 7 days long.
   * This includes leading/trailing days.
   * This only uses native JS objects, so no external libs are needed
   * @param date Native JS date object
   * @returns Date[][]
   */
  const getCalendarView = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const finalOfPrevMonth: Date[] = [];
    const currentMonth: Date[] = [];
    const startOfNextMonth: Date[] = [];

    let iteratedDate = startOfMonth;
    while (iteratedDate.getDay() !== dayWeekStartsOn) {
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() - 1
      );
      finalOfPrevMonth.push(iteratedDate);
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
    // only gather enough days until the the last day of the week
    while (iteratedDate.getDay() !== 7 - dayWeekStartsOn) {
      console.log({ day: iteratedDate.getDay(), offset: 6 - dayWeekStartsOn });
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() + 1
      );
      startOfNextMonth.push(iteratedDate);
    }

    const flatMonthView = [
      ...finalOfPrevMonth.reverse(),
      ...currentMonth,
      ...startOfNextMonth,
    ];

    return [...Array(Math.ceil(flatMonthView.length / 7))].map(() =>
      flatMonthView.splice(0, 7)
    );
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
    weekStartsOn: dayWeekStartsOn,
  };
};
