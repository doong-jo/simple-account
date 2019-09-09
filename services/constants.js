/**
 * 여러 파일에서 사용되는 상수 값들을 정의한다.
 */

const Constants = {
    COOKIE_AGE: 60000, // test 1min // 10min 600000
    COOKIE_SID_NAME: 'sid',
    SESSION_AGE: 10000, // test 10sec // 1hour 3600000
    SALT_ROUNDS: 10,
    REDIS_EXPIRE: 60 * 60 * 24, // 24 hour

    CODE: {
        WRONG: 400,
        UNAUTH: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
    }
};

module.exports = Constants;
