module.exports = {
    rootDir: '../..',
    preset: 'jest-puppeteer',
    testMatch: ['**/?(*.)+(spec).+(ts|tsx|js)'],
    roots: ['./client/e2e'],
    testTimeout: 200000,
    modulePathIgnorePatterns: [],
};
