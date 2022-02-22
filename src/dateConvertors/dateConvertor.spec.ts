import 'regenerator-runtime/runtime';
import { DateConvertor, DisplaySize } from '@/types/DateConvertor';
// import {
//   addDays,
//   addMonths,
//   eachDayOfInterval,
//   eachWeekOfInterval,
//   format,
//   isSameWeek,
//   startOfMonth,
//   startOfWeek,
// } from 'date-fns';
// import { createDateFnsConvertor } from '.';
import { createDefaultConvertor } from '.';
import {
  getAddMonthsToDateTestCases,
  getAreSameMonthTestCases,
  getDayNumberFromDateTestCases,
  getDaysOfWeekTestCases,
  getIsTodayTestCases,
  getMonthNameFromDateTestCases,
  getSubMonthsToDateTestCases,
  getYearFromDateTestCases,
} from './_testHelpers.util';

/**
 * Additional convertors should just be added to this array
 * This ensures all convertors run the same tests, and makes it much easier to
 * add a new convertor without having to rewrite all the tests
 *
 * All tests presume US/eng units
 */
const convertors = [
  // {
  //   name: 'DateFns',
  //   convertor: createDateFnsConvertor({
  //     addDays,
  //     eachDayOfInterval,
  //     eachWeekOfInterval,
  //     format,
  //     startOfMonth,
  //     startOfWeek,
  //     addMonths,
  //     isSameWeek,
  //   }),
  // },
  {
    name: 'NativeJs',
    convertor: createDefaultConvertor(),
  },
];

describe('Date Convertor', () => {
  describe.each<{
    name: string;
    convertor: DateConvertor;
  }>(convertors)('$name convertor', ({ convertor }) => {
    // addMonthsToDate
    it.each<{ originalDate: Date; amount: number; expectedDate: Date }>(
      getAddMonthsToDateTestCases()
    )(
      'addMonthsToDate $originalDate and $amount returns $expectedDate',
      ({ originalDate, amount, expectedDate }) => {
        const result = convertor.addMonthsToDate(originalDate, amount);
        expect(result).toEqual(expectedDate);
      }
    );

    // subMonthsToDate
    it.each<{ originalDate: Date; amount: number; expectedDate: Date }>(
      getSubMonthsToDateTestCases()
    )(
      'subMonthsToDate $originalDate and $amount returns $expectedDate',
      ({ originalDate, amount, expectedDate }) => {
        const result = convertor.subMonthsToDate(originalDate, amount);
        expect(result).toEqual(expectedDate);
      }
    );

    // areSameMonth
    it.each<{ firstDate: Date; secondDate: Date; expected: boolean }>(
      getAreSameMonthTestCases()
    )(
      'areSameMonth $firstDate and $secondDate returns $expected',
      ({ firstDate, secondDate, expected }) => {
        const result = convertor.areSameMonth(firstDate, secondDate);
        expect(result).toBe(expected);
      }
    );

    it('getCalendarViewInWeeks returns correct values (including sibling days)', () => {
      const result = convertor.getCalendarViewInWeeks(new Date(2021, 0, 10));
      expect(result).toEqual([
        [
          new Date(2020, 11, 27),
          new Date(2020, 11, 28),
          new Date(2020, 11, 29),
          new Date(2020, 11, 30),
          new Date(2020, 11, 31),
          new Date(2021, 0, 1),
          new Date(2021, 0, 2),
        ],
        [
          new Date(2021, 0, 3),
          new Date(2021, 0, 4),
          new Date(2021, 0, 5),
          new Date(2021, 0, 6),
          new Date(2021, 0, 7),
          new Date(2021, 0, 8),
          new Date(2021, 0, 9),
        ],
        [
          new Date(2021, 0, 10),
          new Date(2021, 0, 11),
          new Date(2021, 0, 12),
          new Date(2021, 0, 13),
          new Date(2021, 0, 14),
          new Date(2021, 0, 15),
          new Date(2021, 0, 16),
        ],
        [
          new Date(2021, 0, 17),
          new Date(2021, 0, 18),
          new Date(2021, 0, 19),
          new Date(2021, 0, 20),
          new Date(2021, 0, 21),
          new Date(2021, 0, 22),
          new Date(2021, 0, 23),
        ],
        [
          new Date(2021, 0, 24),
          new Date(2021, 0, 25),
          new Date(2021, 0, 26),
          new Date(2021, 0, 27),
          new Date(2021, 0, 28),
          new Date(2021, 0, 29),
          new Date(2021, 0, 30),
        ],
        [
          new Date(2021, 0, 31),
          new Date(2021, 1, 1),
          new Date(2021, 1, 2),
          new Date(2021, 1, 3),
          new Date(2021, 1, 4),
          new Date(2021, 1, 5),
          new Date(2021, 1, 6),
        ],
      ]);
    });

    // getDaysOfWeek
    it.each<{ format: DisplaySize; expected: string[] }>(
      getDaysOfWeekTestCases()
    )(
      'getDaysOfWeek with format "$format" returns $expected',
      ({ format, expected }) => {
        const result = convertor.getDaysOfWeek(format);
        expect(result).toEqual(expected);
      }
    );

    // getMonthNameFromDate
    it.each<{ date: Date; expected: string }>(getMonthNameFromDateTestCases())(
      'getMonthNameFromDate $date returns $expected',
      ({ date, expected }) => {
        const result = convertor.getMonthNameFromDate(date);
        expect(result).toBe(expected);
      }
    );

    // getYearFromDate
    it.each<{ date: Date; expected: number }>(getYearFromDateTestCases())(
      'getYearFromDate $date returns $expected',
      ({ date, expected }) => {
        const result = convertor.getYearFromDate(date);
        expect(result).toBe(expected);
      }
    );

    // getDayNumberFromDate
    it.each<{ date: Date; expected: number }>(getDayNumberFromDateTestCases())(
      'getDayNumberFromDate $date returns $expected',
      ({ date, expected }) => {
        const result = convertor.getDayNumberFromDate(date);
        expect(result).toBe(expected);
      }
    );

    // isDateToday
    it.each<{ date: Date; expected: boolean }>(getIsTodayTestCases())(
      'isDateToday $date returns $expected',
      ({ date, expected }) => {
        const result = convertor.isDateToday(date);
        expect(result).toBe(expected);
      }
    );

    // getEndIndex
    it.each<{ eventEnd: Date; endOfWeek: Date; expected: number }>([
      {
        eventEnd: new Date(2022, 1, 11),
        endOfWeek: new Date(2022, 1, 12),
        expected: 7,
      },
      {
        eventEnd: new Date(2022, 1, 9),
        endOfWeek: new Date(2022, 1, 12),
        expected: 5,
      },
      {
        // event ends on Sunday
        eventEnd: new Date(2021, 8, 26),
        endOfWeek: new Date(2021, 9, 2),
        expected: 2,
      },
      {
        // event that starts and ends on Sunday
        eventEnd: new Date(2022, 0, 2),
        endOfWeek: new Date(2022, 0, 8),
        expected: 2,
      },
    ])(
      'getEndIndex $eventEnd with $endOfWeek returns $expected',
      ({ eventEnd, endOfWeek, expected }) => {
        const result = convertor.getEndIndex(eventEnd, endOfWeek);
        expect(result).toBe(expected);
      }
    );

    // getStartIndex
    it.each<{ eventStart: Date; startOfWeek: Date; expected: number }>([
      {
        eventStart: new Date(2022, 1, 7),
        startOfWeek: new Date(2022, 1, 6),
        expected: 2,
      },
      {
        eventStart: new Date(2022, 1, 9),
        startOfWeek: new Date(2022, 1, 6),
        expected: 4,
      },
      {
        eventStart: new Date(2022, 3, 10),
        startOfWeek: new Date(2022, 3, 10),
        expected: 1,
      },
      {
        // event that starts and ends on Sunday
        eventStart: new Date(2022, 0, 2),
        startOfWeek: new Date(2022, 0, 2),
        expected: 1,
      },
    ])(
      'getStartIndex $eventStart with $startOfWeek returns $expected',
      ({ eventStart, startOfWeek, expected }) => {
        const result = convertor.getStartIndex(eventStart, startOfWeek);
        expect(result).toBe(expected);
      }
    );

    // eventFallsWithinWeek
    it.each<{
      eventStartDate: Date;
      eventEndDate: Date;
      week: Date[];
      expected: boolean;
    }>([
      {
        // starts in previous week
        eventStartDate: new Date(2021, 9, 19),
        eventEndDate: new Date(2021, 10, 3),
        week: [
          new Date(2021, 9, 31),
          new Date(2021, 10, 1),
          new Date(2021, 10, 2),
          new Date(2021, 10, 3),
          new Date(2021, 10, 4),
          new Date(2021, 10, 5),
          new Date(2021, 10, 6),
        ],
        expected: true,
      },
      {
        // starts in previous week, ends in next week
        eventStartDate: new Date(2022, 1, 16),
        eventEndDate: new Date(2022, 1, 28),
        week: [
          new Date(2022, 1, 20),
          new Date(2022, 1, 21),
          new Date(2022, 1, 22),
          new Date(2022, 1, 23),
          new Date(2022, 1, 24),
          new Date(2022, 1, 25),
          new Date(2022, 1, 26),
        ],
        expected: true,
      },
      {
        // ensure events don't appear in previous weeks
        eventStartDate: new Date(2022, 9, 5),
        eventEndDate: new Date(2022, 9, 6),
        week: [
          new Date(2022, 8, 26),
          new Date(2022, 8, 27),
          new Date(2022, 8, 28),
          new Date(2022, 8, 29),
          new Date(2022, 8, 30),
          new Date(2022, 9, 1),
          new Date(2022, 9, 2),
        ],
        expected: false,
      },
    ])(
      'eventFallsWithinWeek event: [$eventStartDate -> $eventEndDate] for week: [$week.0 -> $week.6] returns $expected',
      ({ eventStartDate, eventEndDate, week, expected }) => {
        const result = convertor.eventFallsWithinWeek(
          eventStartDate,
          eventEndDate,
          week
        );
        expect(result).toBe(expected);
      }
    );
  });
});
