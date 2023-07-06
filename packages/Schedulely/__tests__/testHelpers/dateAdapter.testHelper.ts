import { WeekDay } from '@/types';
import chance from 'chance';

const DEFAULT_ITERATIONS = 30;

export const randomDate = () =>
  new Date(
    chance().integer({ min: 2000, max: 2021 }),
    chance().integer({ min: 0, max: 11 }),
    1
  );

export const getAddMonthsToDateTestCases = (
  iterations = DEFAULT_ITERATIONS
) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const originalDate = randomDate();
    const amount = chance().integer({ min: -48, max: 48 });
    const expectedDate = new Date(
      originalDate.getFullYear(),
      originalDate.getMonth() + amount,
      1
    );
    testCases.push({
      originalDate,
      amount,
      expectedDate,
    });
  }
  return testCases;
};

export const getSubMonthsToDateTestCases = (
  iterations = DEFAULT_ITERATIONS
) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const originalDate = randomDate();
    const amount = chance().integer({ min: 0, max: 48 });
    const expectedDate = new Date(
      originalDate.getFullYear(),
      originalDate.getMonth() - amount,
      1
    );
    testCases.push({
      originalDate,
      amount,
      expectedDate,
    });
  }
  return testCases;
};

export const getIsSameMonthMonthTestCases = (
  iterations = DEFAULT_ITERATIONS
) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const firstDate = randomDate();
    const secondDate = randomDate();
    testCases.push({
      firstDate,
      secondDate,
      expected:
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth(),
    });
  }
  return testCases;
};

export const getIsTodayTestCases = (iterations = DEFAULT_ITERATIONS) => {
  const testCases = [
    {
      date: new Date(), //make sure we actually test today
      expected: true,
    },
  ];
  for (let index = 0; index < iterations; index++) {
    const date = randomDate();
    testCases.push({
      date,
      expected: false,
    });
  }
  return testCases;
};

export const getYearFromDateTestCases = (iterations = DEFAULT_ITERATIONS) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const date = new Date(
      chance().integer({ min: 2000, max: 2022 }),
      chance().integer({ min: 0, max: 11 }),
      chance().integer({ min: 1, max: 28 })
    );
    testCases.push({
      date,
      expected: date.getFullYear(),
    });
  }
  return testCases;
};

export const getMonthNameFromDateTestCases = () => [
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      0,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'January',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      1,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'February',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      2,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'March',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      3,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'April',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      4,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'May',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      5,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'June',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      6,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'July',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      7,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'August',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      8,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'September',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      9,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'October',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      10,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'November',
  },
  {
    date: new Date(
      chance().integer({ min: 2000, max: 2022 }),
      11,
      chance().integer({ min: 1, max: 28 })
    ),
    expected: 'December',
  },
];

export const getDaysOfWeekTestCases = (weekStartsOn: WeekDay) =>
  weekStartsOn === WeekDay.Sunday
    ? [
        {
          format: 'long' as 'long' | 'short' | 'narrow',
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
          format: 'short' as 'long' | 'short' | 'narrow',
          expected: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        {
          format: 'narrow' as 'long' | 'short' | 'narrow',
          expected: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        },
      ]
    : weekStartsOn === WeekDay.Monday
    ? [
        {
          format: 'long' as 'long' | 'short' | 'narrow',
          expected: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
        },
        {
          format: 'short' as 'long' | 'short' | 'narrow',
          expected: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        {
          format: 'narrow' as 'long' | 'short' | 'narrow',
          expected: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        },
      ]
    : [];

export const getCalendarViewTestCases = (weekStartsOn: WeekDay) =>
  weekStartsOn === WeekDay.Sunday
    ? [
        {
          firstDayOfMonth: new Date(2021, 0, 10),
          expected: [
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
          ],
        },
      ]
    : weekStartsOn === WeekDay.Monday
    ? [
        {
          firstDayOfMonth: new Date(2021, 0, 10),
          expected: [
            [
              new Date(2020, 11, 28),
              new Date(2020, 11, 29),
              new Date(2020, 11, 30),
              new Date(2020, 11, 31),
              new Date(2021, 0, 1),
              new Date(2021, 0, 2),
              new Date(2021, 0, 3),
            ],
            [
              new Date(2021, 0, 4),
              new Date(2021, 0, 5),
              new Date(2021, 0, 6),
              new Date(2021, 0, 7),
              new Date(2021, 0, 8),
              new Date(2021, 0, 9),
              new Date(2021, 0, 10),
            ],
            [
              new Date(2021, 0, 11),
              new Date(2021, 0, 12),
              new Date(2021, 0, 13),
              new Date(2021, 0, 14),
              new Date(2021, 0, 15),
              new Date(2021, 0, 16),
              new Date(2021, 0, 17),
            ],
            [
              new Date(2021, 0, 18),
              new Date(2021, 0, 19),
              new Date(2021, 0, 20),
              new Date(2021, 0, 21),
              new Date(2021, 0, 22),
              new Date(2021, 0, 23),
              new Date(2021, 0, 24),
            ],
            [
              new Date(2021, 0, 25),
              new Date(2021, 0, 26),
              new Date(2021, 0, 27),
              new Date(2021, 0, 28),
              new Date(2021, 0, 29),
              new Date(2021, 0, 30),
              new Date(2021, 0, 31),
            ],
          ],
        },
      ]
    : [];
