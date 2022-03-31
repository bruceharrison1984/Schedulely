import { DisplaySize } from '@/types/index';
import { Now, ZonedDateTime } from 'temporal-polyfill';
import chance from 'chance';

const DEFAULT_ITERATIONS = 30;

export const randomDate = () =>
  new Date(
    chance().integer({ min: 2000, max: 2021 }),
    chance().integer({ min: 0, max: 11 }),
    1
  );

export const createZonedDateTime = (
  year: number,
  month: number,
  day: number,
  timeZone = 'America/Chicago'
) =>
  ZonedDateTime.from({
    year,
    month,
    day,
    timeZone,
  });

const randomZonedDateTime = () =>
  ZonedDateTime.from({
    year: chance().integer({ min: 2000, max: 2021 }),
    month: chance().integer({ min: 1, max: 12 }),
    day: 1,
    timeZone: 'America/Chicago',
  });

export const getAddMonthsToDateTestCases = (
  iterations = DEFAULT_ITERATIONS
) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const originalDate = randomZonedDateTime();
    const amount = chance().integer({ min: -48, max: 48 });
    const expectedDate = ZonedDateTime.from({
      year: originalDate.year,
      month: originalDate.month + amount,
      day: 1,
      timeZone: 'America/Chicago',
    });
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
    const firstDate = randomZonedDateTime();
    const secondDate = randomZonedDateTime();
    testCases.push({
      firstDate,
      secondDate,
      expected:
        firstDate.year === secondDate.year &&
        firstDate.month === secondDate.month,
    });
  }
  return testCases;
};

export const getIsTodayTestCases = (iterations = DEFAULT_ITERATIONS) => {
  const testCases = [
    {
      date: Now.zonedDateTimeISO(), //make sure we actually test today
      expected: true,
    },
  ];
  for (let index = 0; index < iterations; index++) {
    const date = randomZonedDateTime();
    testCases.push({
      date,
      expected: false,
    });
  }
  return testCases;
};

export const getDayNumberFromDateTestCases = (
  iterations = DEFAULT_ITERATIONS
) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const date = ZonedDateTime.from({
      year: chance().integer({ min: 2000, max: 2022 }),
      month: chance().integer({ min: 0, max: 11 }),
      day: chance().integer({ min: 1, max: 28 }),
      timeZone: 'America/Chicago',
    });
    testCases.push({
      date,
      expected: date.day,
    });
  }
  return testCases;
};

export const getYearFromDateTestCases = (iterations = DEFAULT_ITERATIONS) => {
  const testCases = [];
  for (let index = 0; index < iterations; index++) {
    const date = ZonedDateTime.from({
      year: chance().integer({ min: 2000, max: 2022 }),
      month: chance().integer({ min: 0, max: 11 }),
      day: chance().integer({ min: 1, max: 28 }),
      timeZone: 'America/Chicago',
    });
    testCases.push({
      date,
      expected: date.year,
    });
  }
  return testCases;
};

export const getMonthNameFromDateTestCases = () => {
  const testCases = [];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  for (let index = 0; index < months.length; index++) {
    testCases.push({
      date: createZonedDateTime(
        chance().integer({ min: 2000, max: 2022 }),
        index + 1,
        chance().integer({ min: 1, max: 28 })
      ),
      expected: months[index],
    });
  }
  return testCases;
};

export const getDaysOfWeekTestCases = () => [
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
];
