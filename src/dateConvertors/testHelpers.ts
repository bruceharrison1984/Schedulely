import chance from 'chance';

const DEFAULT_ITERATIONS = 20;

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
    const amount = chance().integer({ min: 0, max: 48 });
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

export const getAreSameMonthTestCases = (iterations = DEFAULT_ITERATIONS) => {
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
