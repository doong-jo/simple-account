const FormValidator = {
    checkId : (value) => {
        // 5 ~ 20, 영 소문자, 숫자, 특수기호 '['_', '-']'
    },

    checkPw : (value1, value2) => {
        // 8 ~ 16, 영 대소문자, 숫자, 특수기호
    },

    checkName: (value) => {
        // 2 ~ 20, 영 대소문자, 한글
    },

    checkYearOfBirth: (value) => {
        // 4자리 양수 숫자
    },

    checkMonthOfBirth: (value) => {
        // 1 ~ 12
    },

    checkDayOfBirth: (value) => {
        // new Date 활용
    },

    checkSex: (value) => {
        // '성별'은 불가
    },

    checkEmail: (value) => {
        // xxx@xxx.xxx 형식
    },

    checkMobile: (value) => {
        // 앞 3자리 010, 10자리 또는 11자리
    }
}

export default FormValidator;