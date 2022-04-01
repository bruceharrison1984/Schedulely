import { DateTimeAdapter, DisplaySize } from '@/types/index';
import { Temporal } from '@js-temporal/polyfill';

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
      Temporal.ZonedDateTime.from({
        year: 2012,
        month: 1,
        day: x,
        timeZone,
      }).toLocaleString(locale, {
        weekday: map.get(displaySize),
      })
    );
  };

  /** //TODO: This needs refactored based on Temporal
   * Ideally, we could gather the  StartOfWeek day for the locale and display accordingly
   * Right now, we always start on Sunday
   */
  const getCalendarView = (date: Temporal.ZonedDateTime) => {
    const startOfMonth = Temporal.ZonedDateTime.from({
      year: date.year,
      month: date.month,
      day: 1,
      timeZone,
    });
    const endOfMonth = startOfMonth.add({ months: 1 });

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
    while (iteratedDate.dayOfWeek !== 7) {
      leadingDaysofNextMonth.push(iteratedDate);
      iteratedDate = iteratedDate.add({ days: 1 });
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

  const getMonthName = (date: Temporal.ZonedDateTime) =>
    date.toLocaleString(locale, { month: 'long' });

  const getYear = (date: Temporal.ZonedDateTime) => date.year;

  const getDayNumber = (date: Temporal.ZonedDateTime) => date.day;

  const isSameMonth = (
    firstDate: Temporal.ZonedDateTime,
    secondDate: Temporal.ZonedDateTime
  ) =>
    firstDate.year === secondDate.year && firstDate.month === secondDate.month;

  const isDateToday = (date: Temporal.ZonedDateTime) => {
    const today = Temporal.Now.zonedDateTimeISO(timeZone);
    return isSameMonth(date, today) && date.day === today.day;
  };

  const addMonthsToDate = (date: Temporal.ZonedDateTime, amount: number) =>
    date.add({ months: amount });

  const getGridStartIndex = (
    eventDate: Temporal.ZonedDateTime,
    startOfWeek: Temporal.ZonedDateTime
  ) =>
    Temporal.ZonedDateTime.compare(eventDate, startOfWeek) <= 0
      ? 1
      : eventDate.dayOfWeek + 1; //add one because css-grid isn't zero-index'd

  const getGridEndIndex = (
    eventEndDate: Temporal.ZonedDateTime,
    endOfWeek: Temporal.ZonedDateTime
  ) => {
    const endDiff = Temporal.ZonedDateTime.compare(eventEndDate, endOfWeek);
    if (endDiff > 0) return 8;
    if (eventEndDate.dayOfWeek === 7) return 2; // TODO: sunday starts the calendar, but is 7 in ISO8601... this needs to be addressed better than this.
    return eventEndDate.dayOfWeek + 2;
  };

  const isEventInWeek = (
    eventStartDate: Temporal.ZonedDateTime,
    eventEndDate: Temporal.ZonedDateTime,
    week: Temporal.ZonedDateTime[]
  ) => {
    if (week.length !== 7) throw new Error('Week length is not equal to 7');
    const startOfWeek = week[0];
    const endOfWeek = week[6];
    const eventStartInWeek =
      Temporal.ZonedDateTime.compare(eventStartDate, startOfWeek) >= 0 &&
      Temporal.ZonedDateTime.compare(eventStartDate, endOfWeek) <= 0;
    const eventEndsInWeek =
      Temporal.ZonedDateTime.compare(eventEndDate, startOfWeek) >= 0 &&
      Temporal.ZonedDateTime.compare(eventEndDate, endOfWeek) <= 0;
    const eventSpansWeek =
      Temporal.ZonedDateTime.compare(eventStartDate, startOfWeek) <= 0 &&
      Temporal.ZonedDateTime.compare(eventEndDate, endOfWeek) >= 0;
    return eventSpansWeek || eventStartInWeek || eventEndsInWeek;
  };

  const convertIsoToDate = (isoDate: string) =>
    Temporal.Instant.from(isoDate).toZonedDateTimeISO({ timeZone });

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
