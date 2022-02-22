/**
 * Common interface for porting date libraries so they can be used with NextMonth
 */
export interface DateConvertor {
  /** Add the specified number of months to the date */
  addMonthsToDate: (date: Date, amount: number) => Date;

  /** Compare two dates, returns true if they are in the same month, in the same year */
  isSameMonth: (firstDate: Date, secondDate: Date) => boolean;

  /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
  getCalendarViewInWeeks: (date: Date) => Date[][];

  /** Get full names of all days of the week */
  getDaysOfWeek: (displaySize: DisplaySize) => string[];

  /** Get the full name of the month for a given date */
  getMonthName: (date: Date) => string;

  /** Get the year component for a given date */
  getYear: (date: Date) => number;

  /** Get the day number component for a given date */
  getDayNumber: (date: Date) => number;

  /** Returns true if the date represent today */
  isDateToday: (date: Date) => boolean;

  /** Subtract a number of months from a date */
  subMonthsToDate: (date: Date, amount: number) => Date;

  /** Does the event fall within or span the supplied week */
  eventFallsWithinWeek: (
    eventStartDate: Date,
    eventEndDate: Date,
    week: Date[]
  ) => boolean;

  /** Get the day of week index for the end of the event */
  getEndIndex: (eventEndDate: Date, endOfWeek: Date) => number;

  /** Get the day of week index for the start of the event */
  getStartIndex: (eventDate: Date, startOfWeek: Date) => number;
}

export enum DisplaySize {
  tiny,
  medium,
  large,
}
