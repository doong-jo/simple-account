const FormValidator = {
    checkId : (value) => {
        // 5 ~ 20, 영 소문자, 숫자, 특수기호 '['_', '-']'
        const regex = /(^[a-z0-9_-]{5,20})$/;
        return regex.test(value);
    },

    checkPw : (value) => {
        // 8 ~ 16, 영 대소문자, 숫자, 특수기호
        const regex = /(^[a-zA-Z0-9!@#$%^&*()-_=+\[\]\{\}\\\|\`\~\/\?\,\.\<\>]{8,16})$/;
        return regex.test(value);
    },

    checkName: (value) => {
        // 2 ~ 20, 영 대소문자, 한글
        const regex = /(^[a-zA-Z가-힣]{2,20})$/;
        return regex.test(value);
    },

    checkYearOfBirth: (value) => {
        // 4자리 양수 숫자
        const regex = /(^[0-9]{4})$/;
        
        return regex.test(value);
    },

    checkMonthOfBirth: (value) => {
        // 1 ~ 12
        const regex = /(^[0-9]{1,2})$/;
        return regex.test(value);
    },

    checkDayOfBirth: (y, m, d) => {
        return new Date(`${y}-${m}-${d}`).getDay() !== NaN;
    },

    checkSex: (value) => {
        // '성별'은 불가
        return value !== '성별' && (value === '남' || value === '여');
    },

    checkEmail: (value) => {
        // xxx@xxx.xxx 형식
        const regex = /(^[a-zA-Z]+)@([a-z]+)\.([a-z]+$)/;
        return regex.test(value);
    },

    checkMobile: (value) => {
        // 앞 3자리 010, 10자리 또는 11자리
        const regex = /[(^010\b)]{3}(([0-9]){7,8})$/;
        return regex.test(value);
    }
}

export default FormValidator;