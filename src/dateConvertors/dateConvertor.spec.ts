/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime';
import { DateConvertor } from '@/types/DateConvertor';
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
import { createDateFnsConvertor } from '.';
import chance from 'chance';

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
];

describe('Date Convertor', () => {
  describe.each<{
    name: string;
    convertor: DateConvertor;
  }>(convertors)('$name function', ({ convertor }) => {
    const testYear = chance().integer({ min: 2000, max: 2021 });
    const testMonth = chance().integer({ min: 0, max: 11 });
    const testDay = chance().integer({ min: 1, max: 28 });
    const testDate = new Date(testYear, testMonth, testDay);

    it(`addMonthsToDate returns correct value`, () => {
      const monthsToAdd = chance().integer({ min: 0, max: 11 });
      const result = convertor.addMonthsToDate(testDate, monthsToAdd);
      expect(result).toEqual(
        new Date(testYear, testMonth + monthsToAdd, testDay)
      );
    });

    // areSameMonth
    it.each<{ firstDate: Date; secondDate: Date; expected: boolean }>([
      {
        //same month, same year
        firstDate: new Date(2000, 1, 1),
        secondDate: new Date(2000, 1, 2),
        expected: true,
      },
      {
        // same year, different month
        firstDate: new Date(2000, 1, 1),
        secondDate: new Date(2000, 2, 2),
        expected: false,
      },
      {
        // same month, diferent year
        firstDate: new Date(2001, 1, 1),
        secondDate: new Date(2000, 1, 2),
        expected: false,
      },
    ])(
      'areSameMonth $firstDate and $secondDate returns $expected',
      ({ firstDate, secondDate, expected }) => {
        const result = convertor.areSameMonth(firstDate, secondDate);
        expect(result).toBe(expected);
      }
    );

    it('getCalendarViewInWeeks returns correct values', () => {
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

    //TODO: Add more tests
    it('getDaysOfWeek returns correct values (english)', () => {
      const result = convertor.getDaysOfWeek();
      expect(result).toEqual([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]);
    });

    it('getMonthNameFromDate returns correct values (english)', () => {
      const intlFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
      const result = convertor.getMonthNameFromDate(testDate);
      expect(result).toEqual(intlFormatter.format(testDate));
    });

    it('getYearFromDate returns correct values', () => {
      const result = convertor.getYearFromDate(testDate);
      expect(result).toEqual(testYear);
    });

    it('getDayNumberFromDate returns correct values', () => {
      const result = convertor.getDayNumberFromDate(testDate);
      expect(result).toEqual(testDay);
    });

    // isDateToday
    it.each<{ date: Date; expected: boolean }>([
      {
        // not today
        date: new Date(2000, 1, 1),
        expected: false,
      },
      {
        // is today
        date: new Date(),
        expected: true,
      },
    ])('isDateToday $date returns $expected', ({ date, expected }) => {
      const result = convertor.isDateToday(date);
      expect(result).toBe(expected);
    });

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

    it(`subMonthsToDate returns correct value`, () => {
      const monthsToAdd = chance().integer({ min: 0, max: 11 });
      const result = convertor.subMonthsToDate(testDate, monthsToAdd);
      expect(result).toEqual(
        new Date(testYear, testMonth - monthsToAdd, testDay)
      );
    });
  });
});
