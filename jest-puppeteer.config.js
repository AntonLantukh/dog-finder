module.exports = {
    server: {
        command: `npm run start:dev`,
        port: 3000,
        protocol: 'http',
        launchTimeout: 30000,
        debug: true,
    },
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS !== 'false',
        timeout: 120000,
    },
};
