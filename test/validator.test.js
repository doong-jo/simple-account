const validator = require('../services/validator');

function getValidateResult(cases) {
    let caseResult;
    const result = cases.some((caseFn) => {
        caseResult = caseFn();
        return !caseResult;
    });

    return !result;
}

function validateDate(y, m, d) { return new Date(`${+y}-${+m}-${+d}`).getDate() === +d; }

function checkId(value) {
    const cases = [
        () => (/(^[a-z0-9_-]{5,20})$/.test(value)),
    ];

    return getValidateResult(cases);
}
    
function checkPw(value) {
    
    const cases = [
        () => (/^(.{8,16})$/.test(value)),
        () => (/[A-Z]/.test(value)),
        () => (/[0-9]/.test(value)),
        // eslint-disable-next-line no-useless-escape
        () => (/[!@#$%^&*(\)\-_=+\[\]\{\}\\\|\`\~\/\?\,\.\<\>]/.test(value)),
    ];

    return getValidateResult(cases);
}
    
function checkName(value) {
    const cases = [
        () => (/(^[a-zA-Z가-힣]{2,20})$/.test(value)),
    ];

    return getValidateResult(cases);
}
    
function checkYearOfBirth(value) {
    const age = new Date().getFullYear() - +value + 1;

    const cases = [
        () => (/(^[0-9]{4})$/.test(`${+value}`)),
        () => (age >= 15),
        () => (age <= 99),
    ];

    return getValidateResult(cases);
}
    
function checkMonthOfBirth(value) {
    const cases = [
        () => (
            /(^[0-9]{1,2})$/.test(value) && value >= 1 && value <= 12
        ),
    ];

    return getValidateResult(cases);
}
    
function checkDateOfBirth(value) {
    // 1 ~ 31
    const cases = [
        () => (/(^[0-9]{1,2})$/.test(`${value}`) && +value >= 1 && value <= 31),
    ];

    return getValidateResult(cases);
}

function checkSex(value) {
    const cases = [
        () => ((value === '남' || value === '여')),
    ];

    return getValidateResult(cases);
}

function checkEmail(value) {
    
    const cases = [
        () => (/(^[a-zA-Z]+)@([a-z]+)\.([a-z]+$)/.test(value)),
    ];

    return getValidateResult(cases);
}

function checkMobile(value) {
    const cases = [
        () => (/([0][1][0])+(([0-9]){7,8})$/.test(value)),
    ];

    return getValidateResult(cases);
}

describe('getValidateResult', () => {
    test('#1 one of false', () => {
        const cases = [
            () => (true),
            () => (false),
        ]
    
        const result = getValidateResult(cases);
        expect(result).toBeFalsy();
    });
    
    test('#2 one of false', () => {
        const cases = [
            () => (false),
            () => (true),
        ]
    
        const result = getValidateResult(cases);
        expect(result).toBeFalsy();
    });
    
    test('#3 all false', () => {
        const cases = [
            () => (false),
            () => (false),
        ]
    
        const result = getValidateResult(cases);
        expect(result).toBeFalsy();
    });
    
    test('#4 all true', () => {
        const cases = [
            () => (true),
            () => (true),
        ]
    
        const result = getValidateResult(cases);
        expect(result).toBeTruthy();
    });
});

describe('validateDate', () => {
    test('#1 wrong date', () => {
        const result = validateDate(2018, 2, 29);
        expect(result).toBeFalsy();
    });
    
    test('#2 correct date', () => {
        const result = validateDate(2018, 2, 28);
        expect(result).toBeTruthy();
    });
    
    test('#2 string date', () => {
        const result = validateDate('2018', '2', '28');
        expect(result).toBeTruthy();
    });
});

describe('checkId', () => {
    test('#1 short', () => {
        const result = checkId('abc');
        expect(result).toBeFalsy();
    });
    
    test('#2 correcnt', () => {
        const result = checkId('abcde');
        expect(result).toBeTruthy();
    });
    
    test('#3 wrong special', () => {
        const result = checkId('abcde!@');
        expect(result).toBeFalsy();
    });
    
    test('#4 correct special', () => {
        const result = checkId('abc__-');
        expect(result).toBeTruthy();
    });
    
    test('#5 long', () => {
        const result = checkId('abcdeasdlkfsjaflksajdflsjflsafjalsjf');
        expect(result).toBeFalsy();
    });
});

describe('checkPw', () => {
    test('#1 upper', () => {
        const result = checkPw('boostcamp');
        expect(result).toBeFalsy();
    });
    
    test('#2 no number', () => {
        const result = checkPw('Boostcamp!');
        expect(result).toBeFalsy();
    });
    
    test('#3 no special', () => {
        const result = checkPw('Boostcamp1');
        expect(result).toBeFalsy();
    });
    
    test('#4 correct', () => {
        const result = checkPw('Boostcamp1!');
        expect(result).toBeTruthy();
    });
    
    test('#5 short', () => {
        const result = checkPw('B1!');
        expect(result).toBeFalsy();
    });
    
    test('#6 long', () => {
        const result = checkPw('Boooooooooooooooooooooooostcamp1');
        expect(result).toBeFalsy();
    });
});

describe('checkName', () => {
    test('#1 short', () =>  {
        const result = checkName('a');
        expect(result).toBeFalsy();
    });
    
    test('#2 long', () =>  {
        const result = checkName('asdflksajflksjflasjdflasfjlasdf');
        expect(result).toBeFalsy();
    });

    test('#3 special', () =>  {
        const result = checkName('asd!@#');
        expect(result).toBeFalsy();
    });
});

describe('checkYearOfBirth', () => {
    test('#1 short', () => {
        const result = checkYearOfBirth(1994);
        expect(result).toBeTruthy();
    });
    
    test('#2 long', () => {
        const result = checkYearOfBirth(19944);
        expect(result).toBeFalsy();
    });
    
    test('#3 not number', () => {
        const result = checkYearOfBirth('abc');
        expect(result).toBeFalsy();
    });
    
    test('#4 special', () => {
        const result = checkYearOfBirth('199!');
        expect(result).toBeFalsy();
    });
    
    test('#5 too young', () => {
        const result = checkYearOfBirth('2018');
        expect(result).toBeFalsy();
    });
    
    test('#6 too old', () => {
        const result = checkYearOfBirth('1900');
        expect(result).toBeFalsy();
    });
    
    test('#7 string', () => {
        const result = checkYearOfBirth('1994');
        expect(result).toBeTruthy();
    });
    
    test('#8 number', () => {
        const result = checkYearOfBirth(1994);
        expect(result).toBeTruthy();
    });
    
});

describe('checkMonthOfBirth', () => {
    test('#1 short', () => {
        const result = checkMonthOfBirth('');
        expect(result).toBeFalsy();
    });
    
    test('#2 long', () => {
        const result = checkMonthOfBirth(133);
        expect(result).toBeFalsy();
    });
    
    test('#3 wrong range', () => {
        const result = checkMonthOfBirth(13);
        expect(result).toBeFalsy();
    });
    
    test('#4 number', () => {
        const result = checkMonthOfBirth(9);
        expect(result).toBeTruthy();
    });
    
    test('#5 string', () => {
        const result = checkMonthOfBirth('9');
        expect(result).toBeTruthy();
    });
    
    test('#6 invalid string', () => {
        const result = checkMonthOfBirth('as');
        expect(result).toBeFalsy();
    });
    
    test('#7 special', () => {
        const result = checkMonthOfBirth('!!');
        expect(result).toBeFalsy();
    });
});

describe('checkDateOfBirth', () => {
    test('#1 short', () => {
        const result = checkDateOfBirth('');
        expect(result).toBeFalsy();
    });
    
    test('#2 long', () => {
        const result = checkDateOfBirth(144);
        expect(result).toBeFalsy();
    });
    
    test('#3 number', () => {
        const result = checkDateOfBirth(14);
        expect(result).toBeTruthy();
    });
    
    test('#4 string', () => {
        const result = checkDateOfBirth('14');
        expect(result).toBeTruthy();
    });
    
    test('#5 invalid string', () => {
        const result = checkDateOfBirth('as');
        expect(result).toBeFalsy();
    });
    
    test('#6 special', () => {
        const result = checkDateOfBirth('!@');
        expect(result).toBeFalsy();
    });
});

describe('checkSex', () => {
    test('#1 male', () => {
        const result = checkSex('남');
        expect(result).toBeTruthy();
    });
    
    test('#2 male', () => {
        const result = checkSex('남');
        expect(result).toBeTruthy();
    });
    
    test('#3 no select', () => {
        const result = checkSex('성별');
        expect(result).toBeFalsy();
    });
    
    test('#4 else', () => {
        const result = checkSex('호');
        expect(result).toBeFalsy();
    });
});

describe('checkEmail', () => {
    test('#1 no .', () => {
        const result = checkEmail('josungdong@navercom');
        expect(result).toBeFalsy();
    });
    
    test('#2 no @', () => {
        const result = checkEmail('josungdongnaver.com');
        expect(result).toBeFalsy();
    });
    
    test('#3 correcnt', () => {
        const result = checkEmail('josungdong@naver.com');
        expect(result).toBeTruthy();
    });
});

describe('checkMobile', () => {
    test('#1 old number 011', () => {
        const result = checkMobile('0111231234');
        expect(result).toBeFalsy();
    });
    
    test('#2 old number 018', () => {
        const result = checkMobile('0181231234');
        expect(result).toBeFalsy();
    });
    
    test('#3 short', () => {
        const result = checkMobile('010');
        expect(result).toBeFalsy();
    });
    
    test('#4 long', () => {
        const result = checkMobile('010123456781234');
        expect(result).toBeFalsy();
    });
    
    test('#5 invalid string', () => {
        const result = checkMobile('asdfsfdsdf');
        expect(result).toBeFalsy();
    });
    
    test('#6 correct', () => {
        const result = checkMobile('01034823161');
        expect(result).toBeTruthy();
    });
});
