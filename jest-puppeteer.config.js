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
        // headless: process.env.HEADLESS !== 'false'
        headless: false,
        timeout: 120000,
        defaultViewport: {
            width: 1024,
            height: 768,
        },
    },
};
