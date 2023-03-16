module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.test.(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // globals: {
  //   'ts-jest': {
  //     tsconfig: './tsconfig.json',
  //   },
  // },
  coverageReporters: ['json', 'lcov', 'text', 'html'],
}
