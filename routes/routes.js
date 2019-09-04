const router = require('express').Router();

const indexRouter = require('./index');
const usersRouter = require('./users');

const routes = {
    '/': indexRouter,
    '/users': usersRouter,
};

const routerEntries = Object.entries(routes);
for (let i = 0; i < routerEntries.length; i += 1) {
    const { 0: path, 1: value } = routerEntries[i];
    router.use(path, value);
}

module.exports = router;
