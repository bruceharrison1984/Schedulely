import { DateTimeAdapter, WeekDay, WeekDayNames } from '@/types';

/**
 * Create an instance of the default date adapter
 * @param locale Locale override
 * @returns DateTimeAdapter
 */
export const createDefaultAdapter = (
  locale: string = 'en',
  dayWeekStartsOn: WeekDay = 'sunday'
): DateTimeAdapter => {
  const getDaysOfWeek = (
    format?: 'long' | 'short' | 'narrow',
    weekStartsOn?: WeekDay
  ) => {
    const weekStart = weekStartsOn ? weekStartsOn : dayWeekStartsOn;
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: format,
    });
    const dates = [0, 1, 2, 3, 4, 5, 6].map((x) =>
      formatter.format(new Date(2012, 0, x + 1))
    );
    // Get the formatted version of weekStartsOn
    const formattedWeekStartsOn = new Intl.DateTimeFormat(locale, {
      weekday: format,
    }).format(new Date(Date.UTC(2012, 0, WeekDayNames.indexOf(weekStart) + 1)));

    // Find the index of weekStartsOn in the array
    const startDayIndex = dates.indexOf(formattedWeekStartsOn);

    // Validate weekStartsOn input
    if (startDayIndex === -1) {
      throw new Error(
        "weekStartsOn should be one of: 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'"
      );
    }

    // Rotate the array until weekStartsOn is the first element
    for (let i = 0; i < startDayIndex; i++) {
      dates.push(dates.shift()!);
    }

    return dates;
  };

  /**
   * This function will return an array of arrays representing a month, split into weeks 7 days long.
   * This includes leading/trailing days.
   * This only uses native JS objects, so no external libs are needed
   * @param date Native JS date object
   * @returns Date[][]
   */
  const getCalendarView = (date: Date, weekStartsOn?: WeekDay) => {
    const weekStart = weekStartsOn ? weekStartsOn : dayWeekStartsOn;

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const finalsOfPrevMonth: Date[] = [];
    const currentMonth: Date[] = [];
    const startsOfSchedulely: Date[] = [];

    let iteratedDate = startOfMonth;
    while (iteratedDate.getDay() !== WeekDayNames.indexOf(weekStart)) {
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
    // only gather enough days until the the last day of the week
    const lastDayCount = 7 - WeekDayNames.indexOf(weekStart);
    while (iteratedDate.getDay() + 1 !== 7 - lastDayCount) {
      iteratedDate = new Date(
        iteratedDate.getFullYear(),
        iteratedDate.getMonth(),
        iteratedDate.getDate() + 1
      );
      startsOfSchedulely.push(iteratedDate);
    }

    const flatMonthView = [
      ...finalsOfPrevMonth.reverse(),
      ...currentMonth,
      ...startsOfSchedulely,
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
