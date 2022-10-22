/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    // '^.+\\.scss$': 'jest-transform-scss',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  modulePathIgnorePatterns: ['.*.testHelper.ts'],
  setupFilesAfterEnv: [
    './jest.env.js',
    '@testing-library/jest-dom/extend-expect',
  ],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 0,
    },
  },
};
