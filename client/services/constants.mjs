/**
 * 여러 파일에서 사용되는 상수 값들을 정의한다.
 */

const Constants = {
    HOST: `https://${document.location.hostname}`,
    
    REQUEST_URL: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        SIGNUP: '/users/signup',
        EXIST: '/users/exists',
        PASSPORT: '/auth/passport',
    },

    PAGE_HASH: {
        LOGIN: '/',
        SIGNUP: './#signup',
        TODO: './#todo-main',
    },
};

export default Constants;
