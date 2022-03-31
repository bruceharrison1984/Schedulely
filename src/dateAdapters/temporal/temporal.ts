import { DateTimeAdapter, DisplaySize } from '@/types/index';
import { Now, ZonedDateTime } from 'temporal-polyfill';

/**
 * Create an instance of the default date adapter
 * @param locale Locale override
 * @returns DateTimeAdapter
 */
export const createTemporalAdapter = (
  locale = 'en',
  timeZone = 'America/Chicago'
): DateTimeAdapter => {
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
        timeZone,
      }).toLocaleString(locale, {
        weekday: map.get(displaySize),
      })
    );
  };

  /** TODO: This needs refactored based on Temporal
   * Ideally, we could gather the  StartOfWeek day for the locale and display accordingly
   * Right now, we always start on Sunday
   */
  const getCalendarView = (date: ZonedDateTime) => {
    const startOfMonth = ZonedDateTime.from({
      year: date.year,
      month: date.month,
      day: 1,
      timeZone,
    });
    const endOfMonth = ZonedDateTime.from({
      year: date.year,
      month: date.month + 1,
      day: 1,
      timeZone,
    }).subtract({ days: 1 });

    const trailingDaysFromPrevMonth = [];
    const currentMonth = [];
    const leadingDaysofNextMonth = [];

    let iteratedDate = startOfMonth;
    while (iteratedDate.dayOfWeek !== 7) {
      iteratedDate = iteratedDate.subtract({ days: 1 });
      trailingDaysFromPrevMonth.push(iteratedDate);
    }

    iteratedDate = startOfMonth;
    while (iteratedDate.month === startOfMonth.month) {
      currentMonth.push(iteratedDate);
      iteratedDate = iteratedDate.add({ days: 1 });
    }

    iteratedDate = endOfMonth;
    //only gather enough days until sunday
    while (iteratedDate.day + 1 !== 7) {
      iteratedDate = iteratedDate.add({ days: 1 });
      leadingDaysofNextMonth.push(iteratedDate);
    }

    const flatMonthView = [
      ...trailingDaysFromPrevMonth.reverse(),
      ...currentMonth,
      ...leadingDaysofNextMonth,
    ];

    return [...Array(Math.ceil(flatMonthView.length / 7))].map(() =>
      flatMonthView.splice(0, 7)
    );
  };

  const getMonthName = (date: ZonedDateTime) =>
    date.toLocaleString(locale, { month: 'long' });

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
  ) =>
    eventDate.epochSeconds <= startOfWeek.epochSeconds ? 1 : eventDate.day + 1; //add one because css-grid isn't zero-index'd

  const getGridEndIndex = (
    eventEndDate: ZonedDateTime,
    endOfWeek: ZonedDateTime
  ) => {
    if (eventEndDate.epochSeconds > endOfWeek.epochSeconds) return 8;
    const end = eventEndDate.dayOfWeek + 2; // add two because css-grid isn't zero index'd, and day of week is zero-index'd
    return end;
  };

  const isEventInWeek = (
    eventStartDate: ZonedDateTime,
    eventEndDate: ZonedDateTime,
    week: ZonedDateTime[]
  ) => {
    if (week.length !== 7) throw new Error('Week length must be 7');
    const eventStartInWeek =
      eventStartDate.epochSeconds >= week[0].epochSeconds &&
      eventStartDate.epochSeconds <= week[6].epochSeconds;
    const eventEndsInWeek =
      eventEndDate.epochSeconds >= week[0].epochSeconds &&
      eventEndDate.epochSeconds <= week[6].epochSeconds;
    const eventSpansWeek =
      eventStartDate.epochSeconds <= week[0].epochSeconds &&
      eventEndDate.epochSeconds >= week[6].epochSeconds;
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
