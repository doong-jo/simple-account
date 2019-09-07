const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');

const routes = {
    '/auth': authRouter,
    '/users': usersRouter,
};

const routerEntries = Object.entries(routes);
for (let i = 0; i < routerEntries.length; i += 1) {
    const { 0: path, 1: value } = routerEntries[i];
    router.use(path, value);
}

module.exports = router;
