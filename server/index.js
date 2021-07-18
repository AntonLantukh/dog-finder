const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${port}`);
});
