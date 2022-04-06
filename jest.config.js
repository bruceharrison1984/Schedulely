/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.s?css$': 'jest-transform-css',
  },
  modulePathIgnorePatterns: ['.*.testHelper.ts'],
  setupFilesAfterEnv: [
    './jest.env.js',
    '@testing-library/jest-dom/extend-expect',
  ],
};
