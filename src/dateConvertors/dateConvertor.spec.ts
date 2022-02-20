import 'regenerator-runtime/runtime';
import { DateConvertor, DisplaySize } from '@/types/DateConvertor';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isSameWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { createDateFnsConvertor, createDefaultConvertor } from '.';
import {
  getAddMonthsToDateTestCases,
  getAreSameMonthTestCases,
  getIsTodayTestCases,
  getSubMonthsToDateTestCases,
  randomDate,
} from './testHelpers';

/**
 * Additional convertors should just be added to this array
 * This ensures all convertors run the same tests, and makes it much easier to
 * add a new convertor without having to rewrite all the tests
 *
 * All tests presume US/eng units
 */
const convertors = [
  {
    name: 'date-fns',
    convertor: createDateFnsConvertor({
      addDays,
      eachDayOfInterval,
      eachWeekOfInterval,
      format,
      startOfMonth,
      startOfWeek,
      addMonths,
      isSameWeek,
    }),
  },
  {
    name: 'native-js',
    convertor: createDefaultConvertor(),
  },
];

describe('Date Convertor', () => {
  describe.each<{
    name: string;
    convertor: DateConvertor;
  }>(convertors)('$name function', ({ convertor }) => {
    // addMonthsToDate
    it.each<{ originalDate: Date; amount: number; expectedDate: Date }>(
      getAddMonthsToDateTestCases(10)
    )(
      'addMonthsToDate $originalDate and $amount returns $expectedDate',
      ({ originalDate, amount, expectedDate }) => {
        const result = convertor.addMonthsToDate(originalDate, amount);
        expect(result).toEqual(expectedDate);
      }
    );

    // subMonthsToDate
    it.each<{ originalDate: Date; amount: number; expectedDate: Date }>(
      getSubMonthsToDateTestCases(10)
    )(
      'subMonthsToDate $originalDate and $amount returns $expectedDate',
      ({ originalDate, amount, expectedDate }) => {
        const result = convertor.subMonthsToDate(originalDate, amount);
        expect(result).toEqual(expectedDate);
      }
    );

    // areSameMonth
    it.each<{ firstDate: Date; secondDate: Date; expected: boolean }>(
      getAreSameMonthTestCases(10)
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
    it.each<{ format: DisplaySize; expected: string[] }>([
      {
        format: DisplaySize.large,
        expected: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      },
      {
        format: DisplaySize.medium,
        expected: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      {
        format: DisplaySize.tiny,
        expected: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      },
    ])(
      'getDaysOfWeek with format "$format" returns $expected',
      ({ format, expected }) => {
        const result = convertor.getDaysOfWeek(format);
        expect(result).toEqual(expected);
      }
    );

    it('getMonthNameFromDate returns correct values (english)', () => {
      const testDate = randomDate();
      const intlFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
      const result = convertor.getMonthNameFromDate(testDate);
      expect(result).toEqual(intlFormatter.format(testDate));
    });

    it('getYearFromDate returns correct values', () => {
      const testDate = randomDate();
      const result = convertor.getYearFromDate(testDate);
      expect(result).toEqual(testDate.getFullYear());
    });

    it('getDayNumberFromDate returns correct values', () => {
      const testDate = randomDate();
      const result = convertor.getDayNumberFromDate(testDate);
      expect(result).toEqual(1);
    });

    // isDateToday
    it.each<{ date: Date; expected: boolean }>(getIsTodayTestCases())(
      'isDateToday $date returns $expected',
      ({ date, expected }) => {
        const result = convertor.isDateToday(date);
        expect(result).toBe(expected);
      }
    );

    // toIso
    // TODO: This test sucks because it ignores TZ
    it.each<{ date: Date; expected: RegExp }>([
      {
        date: new Date(2000, 0, 1),
        expected: /2000-01-01/,
      },
      {
        date: new Date(2010, 1, 28),
        expected: /2010-02-28/,
      },
    ])('toIso $date returns $expected', ({ date, expected }) => {
      const result = convertor.toIso(date);
      expect(result).toMatch(expected);
    });

    // areSameWeek
    it.each<{ date: Date; date2: Date; expected: boolean }>([
      {
        date: new Date(2022, 0, 2),
        date2: new Date(2022, 0, 3),
        expected: true,
      },
      {
        date: new Date(2022, 0, 1),
        date2: new Date(2022, 0, 3),
        expected: false,
      },
      {
        date: new Date(2022, 1, 12),
        date2: new Date(2022, 1, 13),
        expected: false,
      },
      {
        date: new Date(2022, 4, 20),
        date2: new Date(2022, 4, 21),
        expected: true,
      },
      {
        date: new Date(2022, 1, 7),
        date2: new Date(2022, 1, 13),
        expected: false,
      },
      {
        date: new Date(2022, 1, 11),
        date2: new Date(2022, 1, 13),
        expected: false,
      },
    ])(
      'areSameWeek $date with $date2 returns $expected',
      ({ date, date2, expected }) => {
        const result = convertor.areSameWeek(date, date2);
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
    ])(
      'getStartIndex $eventStart with $startOfWeek returns $expected',
      ({ eventStart, startOfWeek, expected }) => {
        const result = convertor.getStartIndex(eventStart, startOfWeek);
        expect(result).toBe(expected);
      }
    );
  });
});
