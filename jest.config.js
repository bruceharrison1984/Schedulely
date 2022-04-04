/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.css$': 'jest-transform-css',
  },
  modulePathIgnorePatterns: ['.*.testHelper.ts'],
};
