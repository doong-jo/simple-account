const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');

const routes = {
    '/auth': authRouter,
    '/users': usersRouter,
};

for(const [path, route] of Object.entries(routes)){
    router.use(path, route);
}

module.exports = router;
