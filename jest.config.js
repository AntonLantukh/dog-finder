const {defaults} = require('jest-config');

module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/client/__mocks__/css.ts',
        '\\.(svg|gif|png|jpg|jpeg)$': '<rootDir>/client/__mocks__/image.ts',
    },
    modulePathIgnorePatterns: ['<rootDir>/client/e2e'],
    coverageProvider: 'v8',
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
};
