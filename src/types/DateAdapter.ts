/**
 * Common interface for porting date libraries so they can be used with Schedulely
 */
export interface DateTimeAdapter {
  /** Add the specified number of months to the date. Using a negative value will subtract that amount. */
  addMonthsToDate: (date: Date, amount: number) => Date;

  /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
  getCalendarView: (date: Date) => Date[][];

  /** Get the day number component for a given date */
  getDayNumber: (date: Date) => number;

  /** Get full names of all days of the week */
  getDaysOfWeek: (displaySize: DisplaySize) => string[];

  /** Get the day of week grid index for the end of the event. Used for positioning within the Week css-grid. */
  getGridEndIndex: (eventEndDate: Date, endOfWeek: Date) => number;

  /** Get the day of week index for the start of the event. Used for positioning within the Week css-grid */
  getGridStartIndex: (eventDate: Date, startOfWeek: Date) => number;

  /** Get the full name of the month for a given date */
  getMonthName: (date: Date) => string;

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
}

export enum DisplaySize {
  tiny,
  medium,
  large,
}
