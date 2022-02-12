/**
 * Common interface for porting date libraries so they can be used with NextMonth
 */
export interface DateConvertor {
  /** Add the specified number of months to the date */
  addMonthsToDate: (date: Date, amount: number) => Date;

  /** Compare two dates, returns true if they are in the same month, in the same year */
  areSameMonth: (firstDate: Date, secondDate: Date) => boolean;

  /** Get the first day of the week for a given date's month */
  getWeeksInMonth: (date: Date) => Date[];

  /** Get all days in the week for a given date */
  getDaysInWeek: (date: Date) => Date[];

  /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
  getCalendarViewInWeeks: (date: Date) => Date[][];

  /** Get full names of all days of the week */
  getDaysOfWeek: (format?: DayOfWeekNameFormat) => string[];

  /** Get the full name of the month for a given date */
  getMonthNameFromDate: (date: Date) => string;

  /** Get the year component for a given date */
  getYearFromDate: (date: Date) => number;

  /** Get the day number component for a given date */
  getDayNumberFromDate: (date: Date) => number;

  /** Returns true if the date represent today */
  isDateToday: (date: Date) => boolean;

  /** Return the ISO string representation of the date*/
  toIso: (date: Date) => string;

  /** Subtract a number of months from a date */
  subMonthsToDate: (date: Date, amount: number) => Date;

  getIntervalLength: (start: Date, end: Date) => number;

  getDayOfWeek: (date: Date) => number;

  areSameWeek: (firstDate: Date, secondDate: Date) => boolean;

  getWeekNumber: (date: Date) => number;
}

//TODO: This needs to be changed. It is tightly coupled for date-fns
export enum DayOfWeekNameFormat {
  short = 'EEEEE',
  medium = 'EE',
  long = 'EEEE',
}
