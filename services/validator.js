const getValidateResult = (cases) => {
    let caseResult;
    const result = cases.some((caseFn) => {
        caseResult = caseFn();
        return !caseResult;
    });

    return !result;
};

module.exports = {
    validateDate(y, m, d) { return new Date(`${y}-${m}-${d}`).getDate() === d; },

    checkId: (value) => {
        // 5 ~ 20, 영 소문자, 숫자, 특수기호 '['_', '-']'
        const cases = [
            () => (/(^[a-z0-9_-]{5,20})$/.test(value)),
        ];

        return getValidateResult(cases);
    },

    checkPw: (value) => {
        // 8 ~ 16, 영 대소문자, 숫자, 특수기호
        const cases = [
            () => (/^(.{8,16})$/.test(value)),
            () => (/[A-Z]/.test(value)),
            () => (/[0-9]/.test(value)),
            // eslint-disable-next-line no-useless-escape
            () => (/[!@#$%^&*(\)\-_=+\[\]\{\}\\\|\`\~\/\?\,\.\<\>]/.test(value)),
        ];

        return getValidateResult(cases);
    },

    checkName: (value) => {
        // 2 ~ 20, 영 대소문자, 한글
        const cases = [
            () => (/(^[a-zA-Z가-힣]{2,20})$/.test(value)),
        ];

        return getValidateResult(cases);
    },

    checkYearOfBirth: (value) => {
        // 4자리 양수 숫자
        const age = new Date().getFullYear() - value + 1;

        const cases = [
            () => (/(^[0-9]{4})$/.test(value)),
            () => (age >= 15),
            () => (age <= 99),
        ];

        return getValidateResult(cases);
    },

    checkMonthOfBirth: (value) => {
        // 1 ~ 12
        const cases = [
            () => (
                /(^[0-9]{1,2})$/.test(value) && value >= 1 && value <= 12
            ),
        ];

        return getValidateResult(cases);
    },

    checkDateOfBirth: (value) => {
        // 1 ~ 31
        const cases = [
            () => (/(^[0-9]{1,2})$/.test(value) && value >= 1 && value <= 31),
        ];

        return getValidateResult(cases);
    },

    checkSex: (value) => {
        // '성별'은 불가
        const cases = [
            () => (value !== '성별' && (value === '남' || value === '여')),
        ];

        return getValidateResult(cases);
    },

    checkEmail: (value) => {
        // xxx@xxx.xxx 형식
        const cases = [
            () => (/(^[a-zA-Z]+)@([a-z]+)\.([a-z]+$)/.test(value)),
        ];

        return getValidateResult(cases);
    },

    checkMobile: (value) => {
        // 앞 3자리 010, 10자리 또는 11자리
        const cases = [
            () => (/([0][1][0])+(([0-9]){7,8})$/.test(value)),
        ];

        return getValidateResult(cases);
    },
};
