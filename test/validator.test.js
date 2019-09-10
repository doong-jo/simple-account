const validator = require('../services/validator');

/**
 * 각 유효성 검사 실시하고 결과 값을 반환합니다.
 *
 * @param {array} cases 유효성 검사 함수들의 배열
 * @returns {boolean} 성공 여부
 */
function getValidateResult(cases) {
    let caseResult;
    const result = cases.some((caseFn) => {
        caseResult = caseFn();
        return !caseResult;
    });

    return !result;
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
        const result = validator.validateDate(2018, 2, 29);
        expect(result).toBeFalsy();
    });
    
    test('#2 correct date', () => {
        const result = validator.validateDate(2018, 2, 28);
        expect(result).toBeTruthy();
    });
    
    test('#2 string date', () => {
        const result = validator.validateDate('2018', '2', '28');
        expect(result).toBeTruthy();
    });
});

describe('checkId', () => {
    test('#1 short', () => {
        const result = validator.checkId('abc');
        expect(result).toBeFalsy();
    });
    
    test('#2 correcnt', () => {
        const result = validator.checkId('abcde');
        expect(result).toBeTruthy();
    });
    
    test('#3 wrong special', () => {
        const result = validator.checkId('abcde!@');
        expect(result).toBeFalsy();
    });
    
    test('#4 correct special', () => {
        const result = validator.checkId('abc__-');
        expect(result).toBeTruthy();
    });
    
    test('#5 long', () => {
        const result = validator.checkId('abcdeasdlkfsjaflksajdflsjflsafjalsjf');
        expect(result).toBeFalsy();
    });
});

describe('checkPw', () => {
    test('#1 upper', () => {
        const result = validator.checkPw('boostcamp');
        expect(result).toBeFalsy();
    });
    
    test('#2 no number', () => {
        const result = validator.checkPw('Boostcamp!');
        expect(result).toBeFalsy();
    });
    
    test('#3 no special', () => {
        const result = validator.checkPw('Boostcamp1');
        expect(result).toBeFalsy();
    });
    
    test('#4 correct', () => {
        const result = validator.checkPw('Boostcamp1!');
        expect(result).toBeTruthy();
    });
    
    test('#5 short', () => {
        const result = validator.checkPw('B1!');
        expect(result).toBeFalsy();
    });
    
    test('#6 long', () => {
        const result = validator.checkPw('Boooooooooooooooooooooooostcamp1');
        expect(result).toBeFalsy();
    });
});

describe('checkName', () => {
    test('#1 short', () =>  {
        const result = validator.checkName('a');
        expect(result).toBeFalsy();
    });
    
    test('#2 long', () =>  {
        const result = validator.checkName('asdflksajflksjflasjdflasfjlasdf');
        expect(result).toBeFalsy();
    });

    test('#3 special', () =>  {
        const result = validator.checkName('asd!@#');
        expect(result).toBeFalsy();
    });
});

describe('checkYearOfBirth', () => {
    test('#1 short', () => {
        const result = validator.checkYearOfBirth(1994);
        expect(result).toBeTruthy();
    });
    
    test('#2 long', () => {
        const result = validator.checkYearOfBirth(19944);
        expect(result).toBeFalsy();
    });
    
    test('#3 not number', () => {
        const result = validator.checkYearOfBirth('abc');
        expect(result).toBeFalsy();
    });
    
    test('#4 special', () => {
        const result = validator.checkYearOfBirth('199!');
        expect(result).toBeFalsy();
    });
    
    test('#5 too young', () => {
        const result = validator.checkYearOfBirth('2018');
        expect(result).toBeFalsy();
    });
    
    test('#6 too old', () => {
        const result = validator.checkYearOfBirth('1900');
        expect(result).toBeFalsy();
    });
    
    test('#7 string', () => {
        const result = validator.checkYearOfBirth('1994');
        expect(result).toBeTruthy();
    });
    
    test('#8 number', () => {
        const result = validator.checkYearOfBirth(1994);
        expect(result).toBeTruthy();
    });
    
});

describe('checkMonthOfBirth', () => {
    test('#1 short', () => {
        const result = validator.checkMonthOfBirth('');
        expect(result).toBeFalsy();
    });
    
    test('#2 long', () => {
        const result = validator.checkMonthOfBirth(133);
        expect(result).toBeFalsy();
    });
    
    test('#3 wrong range', () => {
        const result = validator.checkMonthOfBirth(13);
        expect(result).toBeFalsy();
    });
    
    test('#4 number', () => {
        const result = validator.checkMonthOfBirth(9);
        expect(result).toBeTruthy();
    });
    
    test('#5 string', () => {
        const result = validator.checkMonthOfBirth('9');
        expect(result).toBeTruthy();
    });
    
    test('#6 invalid string', () => {
        const result = validator.checkMonthOfBirth('as');
        expect(result).toBeFalsy();
    });
    
    test('#7 special', () => {
        const result = validator.checkMonthOfBirth('!!');
        expect(result).toBeFalsy();
    });
});

describe('checkDateOfBirth', () => {
    test('#1 short', () => {
        const result = validator.checkDateOfBirth('');
        expect(result).toBeFalsy();
    });
    
    test('#2 long', () => {
        const result = validator.checkDateOfBirth(144);
        expect(result).toBeFalsy();
    });
    
    test('#3 number', () => {
        const result = validator.checkDateOfBirth(14);
        expect(result).toBeTruthy();
    });
    
    test('#4 string', () => {
        const result = validator.checkDateOfBirth('14');
        expect(result).toBeTruthy();
    });
    
    test('#5 invalid string', () => {
        const result = validator.checkDateOfBirth('as');
        expect(result).toBeFalsy();
    });
    
    test('#6 special', () => {
        const result = validator.checkDateOfBirth('!@');
        expect(result).toBeFalsy();
    });
});

describe('checkSex', () => {
    test('#1 male', () => {
        const result = validator.checkSex('남');
        expect(result).toBeTruthy();
    });
    
    test('#2 male', () => {
        const result = validator.checkSex('남');
        expect(result).toBeTruthy();
    });
    
    test('#3 no select', () => {
        const result = validator.checkSex('성별');
        expect(result).toBeFalsy();
    });
    
    test('#4 else', () => {
        const result = validator.checkSex('호');
        expect(result).toBeFalsy();
    });
});

describe('checkEmail', () => {
    test('#1 no .', () => {
        const result = validator.checkEmail('josungdong@navercom');
        expect(result).toBeFalsy();
    });
    
    test('#2 no @', () => {
        const result = validator.checkEmail('josungdongnaver.com');
        expect(result).toBeFalsy();
    });
    
    test('#3 correcnt', () => {
        const result = validator.checkEmail('josungdong@naver.com');
        expect(result).toBeTruthy();
    });
});

describe('checkMobile', () => {
    test('#1 old number 011', () => {
        const result = validator.checkMobile('0111231234');
        expect(result).toBeFalsy();
    });
    
    test('#2 old number 018', () => {
        const result = validator.checkMobile('0181231234');
        expect(result).toBeFalsy();
    });
    
    test('#3 short', () => {
        const result = validator.checkMobile('010');
        expect(result).toBeFalsy();
    });
    
    test('#4 long', () => {
        const result = validator.checkMobile('010123456781234');
        expect(result).toBeFalsy();
    });
    
    test('#5 invalid string', () => {
        const result = validator.checkMobile('asdfsfdsdf');
        expect(result).toBeFalsy();
    });
    
    test('#6 correct', () => {
        const result = validator.checkMobile('01034823161');
        expect(result).toBeTruthy();
    });
});
