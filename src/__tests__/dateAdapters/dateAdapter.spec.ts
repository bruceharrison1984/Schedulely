import { DateTimeAdapter, DisplaySize } from '@/types/index';
import { createDateFnsAdapter } from '@/dateAdapters/index';
import {
  getAddMonthsToDateTestCases,
  getDayNumberFromDateTestCases,
  getDaysOfWeekTestCases,
  getIsSameMonthMonthTestCases,
  getIsTodayTestCases,
  getMonthNameFromDateTestCases,
  getYearFromDateTestCases,
} from './_testHelpers.util';

/**
 * Additional adapters should just be added to this array
 * This ensures all adapters run the same tests, and makes it much easier to
 * add a new adapter without having to rewrite all the tests
 *
 * All tests presume US/eng units
 */
const adapters = [
  {
    name: 'DateFns',
    adapter: createDateFnsAdapter(),
  },
];

describe('Date Adapter', () => {
  describe.each<{
    name: string;
    adapter: DateTimeAdapter;
  }>(adapters)('$name', ({ adapter }) => {
    describe('addMonthsToDate', () => {
      it.each<{ originalDate: Date; amount: number; expectedDate: Date }>(
        getAddMonthsToDateTestCases()
      )(
        '$originalDate and $amount returns $expectedDate',
        ({ originalDate, amount, expectedDate }) => {
          const result = adapter.addMonthsToDate(originalDate, amount);
          expect(result).toEqual(expectedDate);
        }
      );
    });

    describe('isSameMonth', () => {
      it.each<{ firstDate: Date; secondDate: Date; expected: boolean }>(
        getIsSameMonthMonthTestCases()
      )(
        '$firstDate and $secondDate returns $expected',
        ({ firstDate, secondDate, expected }) => {
          const result = adapter.isSameMonth(firstDate, secondDate);
          expect(result).toBe(expected);
        }
      );
    });

    describe('getCalendarView', () => {
      it('returns correct values (including sibling days)', () => {
        const result = adapter.getCalendarView(new Date(2021, 0, 10));
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
    });

    describe('getDaysOfWeek', () => {
      it.each<{ format: DisplaySize; expected: string[] }>(
        getDaysOfWeekTestCases()
      )('with format "$format" returns $expected', ({ format, expected }) => {
        const result = adapter.getDaysOfWeek(format);
        expect(result).toEqual(expected);
      });
    });

    describe('getMonthName', () => {
      it.each<{ date: Date; expected: string }>(
        getMonthNameFromDateTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.getMonthName(date);
        expect(result).toBe(expected);
      });
    });

    describe('getYear', () => {
      it.each<{ date: Date; expected: number }>(getYearFromDateTestCases())(
        '$date returns $expected',
        ({ date, expected }) => {
          const result = adapter.getYear(date);
          expect(result).toBe(expected);
        }
      );
    });

    describe('getDayNumber', () => {
      it.each<{ date: Date; expected: number }>(
        getDayNumberFromDateTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.getDayNumber(date);
        expect(result).toBe(expected);
      });
    });

    describe('isDateToday', () => {
      it.each<{ date: Date; expected: boolean }>(getIsTodayTestCases())(
        '$date returns $expected',
        ({ date, expected }) => {
          const result = adapter.isDateToday(date);
          expect(result).toBe(expected);
        }
      );
    });

    describe('getGridEndIndex', () => {
      it.each<{ eventEnd: Date; endOfWeek: Date; expected: number }>([
        {
          eventEnd: new Date(2022, 1, 11),
          endOfWeek: new Date(2022, 1, 12),
          expected: 7,
        },
        {
          // event ends after end of week
          eventEnd: new Date(2022, 1, 13),
          endOfWeek: new Date(2022, 1, 12),
          expected: 8,
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
        '$eventEnd with $endOfWeek returns $expected',
        ({ eventEnd, endOfWeek, expected }) => {
          const result = adapter.getGridEndIndex(eventEnd, endOfWeek);
          expect(result).toBe(expected);
        }
      );
    });

    describe('getGridStartIndex', () => {
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
        '$eventStart with $startOfWeek returns $expected',
        ({ eventStart, startOfWeek, expected }) => {
          const result = adapter.getGridStartIndex(eventStart, startOfWeek);
          expect(result).toBe(expected);
        }
      );
    });

    describe('isEventInWeek', () => {
      it.each<{
        message: string;
        eventStartDate: Date;
        eventEndDate: Date;
        week: Date[];
        expected: boolean;
      }>([
        {
          message: 'starts in previous week and ends in current week',
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
          message: 'starts in current week and ends in later week',
          eventStartDate: new Date(2021, 10, 1),
          eventEndDate: new Date(2021, 10, 9),
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
          message: 'spans the current week',
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
          message:
            "ensure events in later weeks don't appear in previous weeks",
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
        {
          message:
            "ensure events in previous weeks don't appear in later weeks",
          eventStartDate: new Date(2022, 8, 1),
          eventEndDate: new Date(2022, 8, 25),
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
      ])('$message', ({ eventStartDate, eventEndDate, week, expected }) => {
        const result = adapter.isEventInWeek(
          eventStartDate,
          eventEndDate,
          week
        );
        expect(result).toBe(expected);
      });

      it("throws when week array doesn't have 7 days", () => {
        const eventStartDate = new Date(2022, 8, 1);
        const eventEndDate = new Date(2022, 8, 25);
        expect(() =>
          adapter.isEventInWeek(eventStartDate, eventEndDate, [])
        ).toThrow();
      });
    });
  });
});
