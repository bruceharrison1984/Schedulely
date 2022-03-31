import { DateTimeAdapter, DisplaySize } from '@/types/index';
import { Now, ZonedDateTime } from 'temporal-polyfill';

/**
 * Create an instance of the default date adapter
 * @param locale Locale override
 * @returns DateTimeAdapter
 */
export const createTemporalAdapter = (locale = 'en'): DateTimeAdapter => {
  /** Map used to translate DisplaySize in to Intl day name format */
  const map = new Map<DisplaySize, 'long' | 'narrow' | 'short'>([
    [DisplaySize.large, 'long'],
    [DisplaySize.medium, 'short'],
    [DisplaySize.tiny, 'narrow'],
  ]);

  const getDaysOfWeek = (displaySize: DisplaySize) => {
    return [1, 2, 3, 4, 5, 6, 7].map((x) =>
      ZonedDateTime.from({
        year: 2012,
        month: 1,
        day: x,
        timeZone: 'America/Chicago',
      }).toLocaleString(locale, {
        weekday: map.get(displaySize),
      })
    );
  };

  const getCalendarView = (date: ZonedDateTime) => {
    return new Error('Not Implemented');
    // const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    // const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // const finalsOfPrevMonth = [];
    // const currentMonth = [];
    // const startsOfSchedulely = [];

    // let iteratedDate = startOfMonth;
    // while (iteratedDate.getDay() !== 0) {
    //   iteratedDate = new Date(
    //     iteratedDate.getFullYear(),
    //     iteratedDate.getMonth(),
    //     iteratedDate.getDate() - 1
    //   );
    //   finalsOfPrevMonth.push(iteratedDate);
    // }

    // iteratedDate = startOfMonth;
    // while (iteratedDate.getMonth() === startOfMonth.getMonth()) {
    //   currentMonth.push(iteratedDate);
    //   iteratedDate = new Date(
    //     iteratedDate.getFullYear(),
    //     iteratedDate.getMonth(),
    //     iteratedDate.getDate() + 1
    //   );
    // }

    // iteratedDate = endOfMonth;
    // //only gather enough days until sunday
    // while (iteratedDate.getDay() + 1 !== 7) {
    //   iteratedDate = new Date(
    //     iteratedDate.getFullYear(),
    //     iteratedDate.getMonth(),
    //     iteratedDate.getDate() + 1
    //   );
    //   startsOfSchedulely.push(iteratedDate);
    // }

    // const flatMonthView = [
    //   ...finalsOfPrevMonth.reverse(),
    //   ...currentMonth,
    //   ...startsOfSchedulely,
    // ];

    // return [...Array(Math.ceil(flatMonthView.length / 7))].map(() =>
    //   flatMonthView.splice(0, 7)
    // );
  };

  const getMonthName = (date: ZonedDateTime) => {
    return new Error('Not Implemented');

    // const formatter = new Intl.DateTimeFormat(locale, {
    //   month: 'long',
    // });
    // return formatter.format(date);
  };

  const getYear = (date: ZonedDateTime) => date.year;

  const getDayNumber = (date: ZonedDateTime) => date.day;

  const isSameMonth = (firstDate: ZonedDateTime, secondDate: ZonedDateTime) =>
    getYear(firstDate) === getYear(secondDate) &&
    firstDate.month === secondDate.month;

  const isDateToday = (date: ZonedDateTime) => {
    const today = Now.zonedDateTimeISO();
    return isSameMonth(date, today) && date.day === today.day;
  };

  const addMonthsToDate = (date: ZonedDateTime, amount: number) =>
    date.add({ months: amount });

  const getGridStartIndex = (
    eventDate: ZonedDateTime,
    startOfWeek: ZonedDateTime
  ) => (eventDate <= startOfWeek ? 1 : eventDate.day + 1); //add one because css-grid isn't zero-index'd

  const getGridEndIndex = (
    eventEndDate: ZonedDateTime,
    endOfWeek: ZonedDateTime
  ) => {
    if (eventEndDate > endOfWeek) return 8;
    const end = eventEndDate.day + 2; // add two because css-grid isn't zero index'd, and day of week is zero-index'd
    return end;
  };

  const isEventInWeek = (
    eventStartDate: ZonedDateTime,
    eventEndDate: ZonedDateTime,
    week: ZonedDateTime[]
  ) => {
    if (week.length !== 7) throw new Error('Week length must be 7');
    const eventStartInWeek =
      eventStartDate >= week[0] && eventStartDate <= week[6];
    const eventEndsInWeek = eventEndDate >= week[0] && eventEndDate <= week[6];
    const eventSpansWeek = eventStartDate <= week[0] && eventEndDate >= week[6];
    return eventSpansWeek || eventStartInWeek || eventEndsInWeek;
  };

  const convertIsoToDate = (isoDate: string) => ZonedDateTime.from(isoDate);

  return {
    getCalendarView,
    getDaysOfWeek,
    getMonthName,
    getYear,
    getDayNumber,
    isSameMonth,
    isDateToday,
    addMonthsToDate,
    getGridEndIndex,
    getGridStartIndex,
    isEventInWeek,
    convertIsoToDate,
  };
};
