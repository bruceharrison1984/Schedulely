import { WeekDay } from './WeekDay';

/**
 * Common interface for porting date libraries so they can be used with Schedulely
 */
export interface DateTimeAdapter {
  /** Add the specified number of months to the date. Using a negative value will subtract that amount. */
  addMonthsToDate: (date: Date, amount: number) => Date;

  /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
  getCalendarView: (date: Date, weekStartsOn?: WeekDay) => Date[][];

  /**
   * Get names of all days of the week in the format specified
   * @param format The format of the name that will be returned
   * @returns Array of strings that contain the names of the days of the week
   */
  getDaysOfWeek: (format?: 'long' | 'short' | 'narrow') => string[];

  /**
   * Get the full name of the month for a given date
   * @param date The date to get the name of the month for
   * @param format The format of the name that will be returned
   * @returns Name of the month in the specified format
   */
  getMonthName: (date: Date, format: 'long' | 'short') => string;

  /** Get the year component for a given date */
  getYear: (date: Date) => number;

  /** Convert and ISO format string to a Date object */
  convertIsoToDate: (isoDate: string) => Date;

  /** Returns true if the date represent today */
  isDateToday: (date: Date) => boolean;

  /** Does the event fall within or span the supplied week */
  isEventInWeek: (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => boolean;

  /** Compare two dates, returns true if they are in the same month, in the same year */
  isSameMonth: (firstDate: Date, secondDate: Date) => boolean;

  /** Is the supplied month the same as the current month */
  isCurrentMonth: (date: Date) => boolean;

  /** Does the target date fall between the supplied dates */
  isDateBetween: (targetDate: Date, dateOne: Date, dateTwo: Date) => boolean;

  /** What day of the week the week starts on, with 0 = Sunday, 1 = Monday, etc. */
  firstDayOfWeek: WeekDay;
}
