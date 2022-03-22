/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Shim type to avoid import date-fns
 * Could be brittle if they change type
 */
interface Interval {
  start: number | Date;
  end: number | Date;
}

/**
 * Shim type to avoid import date-fns
 * Could be brittle if they change type
 */
interface Locale {
  code?: string;
  formatDistance?: (...args: Array<any>) => any;
  formatRelative?: (...args: Array<any>) => any;
  localize?: {
    ordinalNumber: (...args: Array<any>) => any;
    era: (...args: Array<any>) => any;
    quarter: (...args: Array<any>) => any;
    month: (...args: Array<any>) => any;
    day: (...args: Array<any>) => any;
    dayPeriod: (...args: Array<any>) => any;
  };
  formatLong?: {
    date: (...args: Array<any>) => any;
    time: (...args: Array<any>) => any;
    dateTime: (...args: Array<any>) => any;
  };
  match?: {
    ordinalNumber: (...args: Array<any>) => any;
    era: (...args: Array<any>) => any;
    quarter: (...args: Array<any>) => any;
    month: (...args: Array<any>) => any;
    day: (...args: Array<any>) => any;
    dayPeriod: (...args: Array<any>) => any;
  };
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
}

/**
 * Simple interface for using date-fns with Schedulely
 *
 * Functions can be passed directly from import.
 */
export interface DateFnsFunctions {
  addDays: (date: number | Date, amount: number) => Date;
  eachDayOfInterval: (
    interval: Interval,
    options?:
      | {
          step?: number | undefined;
        }
      | undefined
  ) => Date[];
  eachWeekOfInterval: (
    interval: Interval,
    options?:
      | {
          locale?: Locale | undefined;
          weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
        }
      | undefined
  ) => Date[];
  format: (
    date: number | Date,
    format: string,
    options?:
      | {
          locale?: Locale | undefined;
          weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
          firstWeekContainsDate?: number | undefined;
          useAdditionalWeekYearTokens?: boolean | undefined;
          useAdditionalDayOfYearTokens?: boolean | undefined;
        }
      | undefined
  ) => string;
  startOfMonth: (date: number | Date) => Date;
  startOfWeek: (
    date: number | Date,
    options?:
      | {
          locale?: Locale | undefined;
          weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
        }
      | undefined
  ) => Date;
  addMonths: (date: number | Date, amount: number) => Date;
  isSameWeek(
    dateLeft: Date | number,
    dateRight: Date | number,
    options?:
      | {
          locale?: Locale | undefined;
          weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
        }
      | undefined
  ): boolean;
}
