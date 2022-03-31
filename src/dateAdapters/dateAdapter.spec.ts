import { DateTimeAdapter, DisplaySize } from '@/types/DateAdapter';
import { ZonedDateTime } from 'temporal-polyfill';
import { createTemporalAdapter } from './temporal';

import {
  createZonedDateTime,
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
    name: 'TemporalAdapter',
    adapter: createTemporalAdapter(),
  },
];

describe('Date Adapter', () => {
  describe.each<{
    name: string;
    adapter: DateTimeAdapter;
  }>(adapters)('$name', ({ adapter }) => {
    describe('addMonthsToDate', () => {
      it.each<{
        originalDate: ZonedDateTime;
        amount: number;
        expectedDate: ZonedDateTime;
      }>(getAddMonthsToDateTestCases())(
        '$originalDate and $amount returns $expectedDate',
        ({ originalDate, amount, expectedDate }) => {
          const result = adapter.addMonthsToDate(originalDate, amount);
          expect(result).toEqual(expectedDate);
        }
      );
    });

    describe('isSameMonth', () => {
      it.each<{
        firstDate: ZonedDateTime;
        secondDate: ZonedDateTime;
        expected: boolean;
      }>(getIsSameMonthMonthTestCases())(
        '$firstDate and $secondDate returns $expected',
        ({ firstDate, secondDate, expected }) => {
          const result = adapter.isSameMonth(firstDate, secondDate);
          expect(result).toBe(expected);
        }
      );
    });

    // describe('getCalendarView', () => {
    //   it('returns correct values (including sibling days)', () => {
    //     const result = adapter.getCalendarView(
    //       createZonedDateTime(2021, 0, 10)
    //     );
    //     expect(result).toEqual([
    //       [
    //         createZonedDateTime(2020, 11, 27),
    //         createZonedDateTime(2020, 11, 28),
    //         createZonedDateTime(2020, 11, 29),
    //         createZonedDateTime(2020, 11, 30),
    //         createZonedDateTime(2020, 11, 31),
    //         createZonedDateTime(2021, 0, 1),
    //         createZonedDateTime(2021, 0, 2),
    //       ],
    //       [
    //         createZonedDateTime(2021, 0, 3),
    //         createZonedDateTime(2021, 0, 4),
    //         createZonedDateTime(2021, 0, 5),
    //         createZonedDateTime(2021, 0, 6),
    //         createZonedDateTime(2021, 0, 7),
    //         createZonedDateTime(2021, 0, 8),
    //         createZonedDateTime(2021, 0, 9),
    //       ],
    //       [
    //         createZonedDateTime(2021, 0, 10),
    //         createZonedDateTime(2021, 0, 11),
    //         createZonedDateTime(2021, 0, 12),
    //         createZonedDateTime(2021, 0, 13),
    //         createZonedDateTime(2021, 0, 14),
    //         createZonedDateTime(2021, 0, 15),
    //         createZonedDateTime(2021, 0, 16),
    //       ],
    //       [
    //         createZonedDateTime(2021, 0, 17),
    //         createZonedDateTime(2021, 0, 18),
    //         createZonedDateTime(2021, 0, 19),
    //         createZonedDateTime(2021, 0, 20),
    //         createZonedDateTime(2021, 0, 21),
    //         createZonedDateTime(2021, 0, 22),
    //         createZonedDateTime(2021, 0, 23),
    //       ],
    //       [
    //         createZonedDateTime(2021, 0, 24),
    //         createZonedDateTime(2021, 0, 25),
    //         createZonedDateTime(2021, 0, 26),
    //         createZonedDateTime(2021, 0, 27),
    //         createZonedDateTime(2021, 0, 28),
    //         createZonedDateTime(2021, 0, 29),
    //         createZonedDateTime(2021, 0, 30),
    //       ],
    //       [
    //         createZonedDateTime(2021, 0, 31),
    //         createZonedDateTime(2021, 1, 1),
    //         createZonedDateTime(2021, 1, 2),
    //         createZonedDateTime(2021, 1, 3),
    //         createZonedDateTime(2021, 1, 4),
    //         createZonedDateTime(2021, 1, 5),
    //         createZonedDateTime(2021, 1, 6),
    //       ],
    //     ]);
    //   });
    // });

    describe('getDaysOfWeek', () => {
      it.each<{ format: DisplaySize; expected: string[] }>(
        getDaysOfWeekTestCases()
      )('with format "$format" returns $expected', ({ format, expected }) => {
        const result = adapter.getDaysOfWeek(format);
        expect(result).toEqual(expected);
      });
    });

    describe('getMonthName', () => {
      it.each<{ date: ZonedDateTime; expected: string }>(
        getMonthNameFromDateTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.getMonthName(date);
        expect(result).toBe(expected);
      });
    });

    describe('getYear', () => {
      it.each<{ date: ZonedDateTime; expected: number }>(
        getYearFromDateTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.getYear(date);
        expect(result).toBe(expected);
      });
    });

    describe('getDayNumber', () => {
      it.each<{ date: ZonedDateTime; expected: number }>(
        getDayNumberFromDateTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.getDayNumber(date);
        expect(result).toBe(expected);
      });
    });

    describe('isDateToday', () => {
      it.each<{ date: ZonedDateTime; expected: boolean }>(
        getIsTodayTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.isDateToday(date);
        expect(result).toBe(expected);
      });
    });

    describe('getGridEndIndex', () => {
      it.each<{
        eventEnd: ZonedDateTime;
        endOfWeek: ZonedDateTime;
        expected: number;
      }>([
        {
          eventEnd: createZonedDateTime(2022, 2, 11),
          endOfWeek: createZonedDateTime(2022, 2, 12),
          expected: 7,
        },
        {
          // event ends after end of week
          eventEnd: createZonedDateTime(2022, 2, 13),
          endOfWeek: createZonedDateTime(2022, 2, 12),
          expected: 8,
        },
        {
          eventEnd: createZonedDateTime(2022, 2, 9),
          endOfWeek: createZonedDateTime(2022, 2, 12),
          expected: 5,
        },
        {
          // event ends on Sunday
          eventEnd: createZonedDateTime(2021, 9, 26),
          endOfWeek: createZonedDateTime(2021, 10, 2),
          expected: 2,
        },
        {
          // event that starts and ends on Sunday
          eventEnd: createZonedDateTime(2022, 1, 2),
          endOfWeek: createZonedDateTime(2022, 1, 8),
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
      it.each<{
        eventStart: ZonedDateTime;
        startOfWeek: ZonedDateTime;
        expected: number;
      }>([
        {
          eventStart: createZonedDateTime(2022, 1, 7),
          startOfWeek: createZonedDateTime(2022, 1, 6),
          expected: 2,
        },
        {
          eventStart: createZonedDateTime(2022, 1, 9),
          startOfWeek: createZonedDateTime(2022, 1, 6),
          expected: 4,
        },
        {
          eventStart: createZonedDateTime(2022, 3, 10),
          startOfWeek: createZonedDateTime(2022, 3, 10),
          expected: 1,
        },
        {
          // event that starts and ends on Sunday
          eventStart: createZonedDateTime(2022, 0, 2),
          startOfWeek: createZonedDateTime(2022, 0, 2),
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
        eventStartDate: ZonedDateTime;
        eventEndDate: ZonedDateTime;
        week: ZonedDateTime[];
        expected: boolean;
      }>([
        {
          message: 'starts in previous week and ends in current week',
          eventStartDate: createZonedDateTime(2021, 9, 19),
          eventEndDate: createZonedDateTime(2021, 10, 3),
          week: [
            createZonedDateTime(2021, 9, 31),
            createZonedDateTime(2021, 10, 1),
            createZonedDateTime(2021, 10, 2),
            createZonedDateTime(2021, 10, 3),
            createZonedDateTime(2021, 10, 4),
            createZonedDateTime(2021, 10, 5),
            createZonedDateTime(2021, 10, 6),
          ],
          expected: true,
        },
        {
          message: 'starts in current week and ends in later week',
          eventStartDate: createZonedDateTime(2021, 10, 1),
          eventEndDate: createZonedDateTime(2021, 10, 9),
          week: [
            createZonedDateTime(2021, 9, 31),
            createZonedDateTime(2021, 10, 1),
            createZonedDateTime(2021, 10, 2),
            createZonedDateTime(2021, 10, 3),
            createZonedDateTime(2021, 10, 4),
            createZonedDateTime(2021, 10, 5),
            createZonedDateTime(2021, 10, 6),
          ],
          expected: true,
        },
        {
          message: 'spans the current week',
          eventStartDate: createZonedDateTime(2022, 1, 16),
          eventEndDate: createZonedDateTime(2022, 1, 28),
          week: [
            createZonedDateTime(2022, 1, 20),
            createZonedDateTime(2022, 1, 21),
            createZonedDateTime(2022, 1, 22),
            createZonedDateTime(2022, 1, 23),
            createZonedDateTime(2022, 1, 24),
            createZonedDateTime(2022, 1, 25),
            createZonedDateTime(2022, 1, 26),
          ],
          expected: true,
        },
        {
          message:
            "ensure events in later weeks don't appear in previous weeks",
          eventStartDate: createZonedDateTime(2022, 9, 5),
          eventEndDate: createZonedDateTime(2022, 9, 6),
          week: [
            createZonedDateTime(2022, 8, 26),
            createZonedDateTime(2022, 8, 27),
            createZonedDateTime(2022, 8, 28),
            createZonedDateTime(2022, 8, 29),
            createZonedDateTime(2022, 8, 30),
            createZonedDateTime(2022, 9, 1),
            createZonedDateTime(2022, 9, 2),
          ],
          expected: false,
        },
        {
          message:
            "ensure events in previous weeks don't appear in later weeks",
          eventStartDate: createZonedDateTime(2022, 8, 1),
          eventEndDate: createZonedDateTime(2022, 8, 25),
          week: [
            createZonedDateTime(2022, 8, 26),
            createZonedDateTime(2022, 8, 27),
            createZonedDateTime(2022, 8, 28),
            createZonedDateTime(2022, 8, 29),
            createZonedDateTime(2022, 8, 30),
            createZonedDateTime(2022, 9, 1),
            createZonedDateTime(2022, 9, 2),
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
        const eventStartDate = createZonedDateTime(2022, 8, 1);
        const eventEndDate = createZonedDateTime(2022, 8, 25);
        expect(() =>
          adapter.isEventInWeek(eventStartDate, eventEndDate, [])
        ).toThrow();
      });
    });
  });
});
