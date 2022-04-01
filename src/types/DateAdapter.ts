import { ZonedDateTime } from 'temporal-polyfill';

/**
 * Common interface for porting date libraries so they can be used with Schedulely
 */
export interface DateTimeAdapter {
  /** Add the specified number of months to the date. Using a negative value will subtract that amount. */
  addMonthsToDate: (date: ZonedDateTime, amount: number) => ZonedDateTime;

  /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
  getCalendarView: (date: ZonedDateTime) => ZonedDateTime[][];

  /** Get the day number component for a given date */
  getDayNumber: (date: ZonedDateTime) => number;

  /** Get full names of all days of the week */
  getDaysOfWeek: (displaySize: DisplaySize) => string[];

  /** Get the day of week grid index for the end of the event. Used for positioning within the Week css-grid. */
  getGridEndIndex: (
    eventEndDate: ZonedDateTime,
    endOfWeek: ZonedDateTime
  ) => number;

  /** Get the day of week index for the start of the event. Used for positioning within the Week css-grid */
  getGridStartIndex: (
    eventDate: ZonedDateTime,
    startOfWeek: ZonedDateTime
  ) => number;

  /** Get the full name of the month for a given date */
  getMonthName: (date: ZonedDateTime) => string;

  /** Get the year component for a given date */
  getYear: (date: ZonedDateTime) => number;

  /** Convert and ISO format string to a Date object */
  convertIsoToDate: (isoDate: string) => ZonedDateTime;

  /** Returns true if the date represent today */
  isDateToday: (date: ZonedDateTime) => boolean;

  /** Does the event fall within or span the supplied week */
  isEventInWeek: (
    eventStartDate: ZonedDateTime,
    eventEndDate: ZonedDateTime,
    week: ZonedDateTime[]
  ) => boolean;

  /** Compare two dates, returns true if they are in the same month, in the same year */
  isSameMonth: (firstDate: ZonedDateTime, secondDate: ZonedDateTime) => boolean;
}

export enum DisplaySize {
  tiny,
  medium,
  large,
}
