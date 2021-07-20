module.exports = {
    '**/*.{js,ts,tsx,json}': ['npm run lint:eslint'],
    '**/*.{css,scss}': ['npm run lint:css'],
    '**/*.ts?(x)': () => 'npm run lint:types',
    '**/*.ts': ['npm run test:related'],
};
