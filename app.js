const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const notFoundHandler = require('./util/notFoundHandler');
const serverInternalHandler = require('./util/serverInternalHandler');
const mainRouter = require('./routes/routes');

const port = 8090;
const staticServe = express.static(path.join(__dirname, 'views'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(cookieParser());
app.use(staticServe);
app.use(notFoundHandler);
app.use(serverInternalHandler);

app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`Listening ${port}...`);
});

module.exports = app;
