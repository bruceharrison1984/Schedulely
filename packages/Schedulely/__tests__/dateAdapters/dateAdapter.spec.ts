import { DateTimeAdapter, WeekDay } from '@/types/index';
import { createDefaultAdapter } from '@/dateAdapters/date';
import {
  getAddMonthsToDateTestCases,
  getCalendarViewTestCases,
  getDaysOfWeekTestCases,
  getIsSameMonthMonthTestCases,
  getIsTodayTestCases,
  getMonthNameFromDateTestCases,
  getYearFromDateTestCases,
} from '../testHelpers/dateAdapter.testHelper';

/**
 * Additional adapters should just be added to this array
 * This ensures all adapters run the same tests, and makes it much easier to
 * add a new adapter without having to rewrite all the tests
 *
 * All tests presume US/eng units
 */
const adapters = [
  {
    name: 'Date',
    adapter: createDefaultAdapter(),
  },
  {
    name: 'DateWithStartOfWeek',
    adapter: createDefaultAdapter('en', WeekDay.Monday),
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
      it.each(getCalendarViewTestCases(adapter.startOfWeek))(
        'returns correct values (including sibling days)',
        ({ firstDayOfMonth, expected }) => {
          const result = adapter.getCalendarView(firstDayOfMonth);
          expect(result).toEqual(expected);
        }
      );
    });

    describe('getDaysOfWeek', () => {
      it.each<{ format: 'long' | 'short' | 'narrow'; expected: string[] }>(
        getDaysOfWeekTestCases(adapter.startOfWeek)
      )('with format "$format" returns $expected', ({ format, expected }) => {
        const result = adapter.getDaysOfWeek(format);
        expect(result).toEqual(expected);
      });
    });

    describe('getMonthName', () => {
      it.each<{ date: Date; expected: string }>(
        getMonthNameFromDateTestCases()
      )('$date returns $expected', ({ date, expected }) => {
        const result = adapter.getMonthName(date, 'long');
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

    describe('isDateToday', () => {
      it.each<{ date: Date; expected: boolean }>(getIsTodayTestCases())(
        '$date returns $expected',
        ({ date, expected }) => {
          const result = adapter.isDateToday(date);
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

    describe('isDateBetween', () => {
      it.each<{
        targetDate: Date;
        dateOne: Date;
        dateTwo: Date;
        expected: boolean;
      }>([
        {
          targetDate: new Date(2022, 1, 8),
          dateOne: new Date(2022, 1, 6),
          dateTwo: new Date(2022, 1, 9),
          expected: true,
        },
        {
          targetDate: new Date(2022, 1, 8),
          dateOne: new Date(2022, 1, 10),
          dateTwo: new Date(2022, 1, 11),
          expected: false,
        },
        {
          targetDate: new Date(2022, 1, 6),
          dateOne: new Date(2022, 1, 6),
          dateTwo: new Date(2022, 1, 9),
          expected: true,
        },
        {
          targetDate: new Date(2022, 1, 9),
          dateOne: new Date(2022, 1, 6),
          dateTwo: new Date(2022, 1, 9),
          expected: true,
        },
      ])(
        '$targetDate between $dateOne and $dateTwo returns $expected',
        ({ targetDate, dateOne, dateTwo, expected }) => {
          const result = adapter.isDateBetween(targetDate, dateOne, dateTwo);
          expect(result).toBe(expected);
        }
      );
    });
  });
});
