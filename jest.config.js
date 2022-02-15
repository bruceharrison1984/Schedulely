// eslint-disable-next-line no-undef
module.exports = {
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
  },
  transform: {
    '^.+\\.ts(x)?$': 'babel-jest',
    '^.+\\.scss$': 'jest-transform-css',
  },
};
