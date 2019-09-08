const Constants = {
    COOKIE_AGE: 60000, // test 1min // 10min 600000
    COOKIE_SID_NAME: 'sid',
    SESSION_AGE: 10000, // test 10sec // 1hour 3600000
    SALT_ROUNDS: 10,

    CODE: {
        WRONG: 400,
        UNAUTH: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
    }
};

module.exports = Constants;
