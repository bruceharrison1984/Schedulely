import { Temporal } from '@js-temporal/polyfill';

/**
 * Common interface for porting date libraries so they can be used with Schedulely
 */
export interface DateTimeAdapter {
  /** Add the specified number of months to the date. Using a negative value will subtract that amount. */
  addMonthsToDate: (
    date: Temporal.ZonedDateTime,
    amount: number
  ) => Temporal.ZonedDateTime;

  /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
  getCalendarView: (date: Temporal.ZonedDateTime) => Temporal.ZonedDateTime[][];

  /** Get the day number component for a given date */
  getDayNumber: (date: Temporal.ZonedDateTime) => number;

  /** Get full names of all days of the week */
  getDaysOfWeek: (displaySize: DisplaySize) => string[];

  /** Get the day of week grid index for the end of the event. Used for positioning within the Week css-grid. */
  getGridEndIndex: (
    eventEndDate: Temporal.ZonedDateTime,
    endOfWeek: Temporal.ZonedDateTime
  ) => number;

  /** Get the day of week index for the start of the event. Used for positioning within the Week css-grid */
  getGridStartIndex: (
    eventDate: Temporal.ZonedDateTime,
    startOfWeek: Temporal.ZonedDateTime
  ) => number;

  /** Get the full name of the month for a given date */
  getMonthName: (date: Temporal.ZonedDateTime) => string;

  /** Get the year component for a given date */
  getYear: (date: Temporal.ZonedDateTime) => number;

  /** Convert and ISO format string to a Date object */
  convertIsoToDate: (isoDate: string) => Temporal.ZonedDateTime;

  /** Returns true if the date represent today */
  isDateToday: (date: Temporal.ZonedDateTime) => boolean;

  /** Does the event fall within or span the supplied week */
  isEventInWeek: (
    eventStartDate: Temporal.ZonedDateTime,
    eventEndDate: Temporal.ZonedDateTime,
    week: Temporal.ZonedDateTime[]
  ) => boolean;

  /** Compare two dates, returns true if they are in the same month, in the same year */
  isSameMonth: (
    firstDate: Temporal.ZonedDateTime,
    secondDate: Temporal.ZonedDateTime
  ) => boolean;
}

export enum DisplaySize {
  tiny,
  medium,
  large,
}
