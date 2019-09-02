/* eslint-disable import/extensions */
import FormValidator from '../../../services/form-validator.mjs';

const SignupFormData = (target) => [
    {
        type: 'label',
        for: 'f_id',
        innerHTML: '아이디',
    }, {
        type: 'input',
        inputType: 'text',
        nameAndId: 'f_id',
        nick: '아이디',
        maxLength: 20,
        placeholder: '5~20자, 영 소문자, 숫자, (_, -)만 사용 가능',
        validator: FormValidator.checkId,
        denySentence: [
            '이미 사용중인 아이디입니다.',
            '5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.',
        ],
        successSentence: '사용 가능한 아이디입니다.',
    }, {
        type: 'label',
        for: 'f_pw',
        innerHTML: '비밀번호',
    }, {
        type: 'input',
        inputType: 'password',
        nameAndId: 'f_pw',
        nick: '비밀번호',
        maxLength: 16,
        placeholder: '8~16자, 영 대소문자, 숫자, 특수문자의 조합',
        validator: FormValidator.checkPw,
        denySentence: [
            '8자 이상 16자 이하로 입력해주세요.',
            '영문 대문자를 최소 1자 이상 포함해주세요.',
            '숫자를 최소 1자 이상 포함해주세요.',
            '특수문자를 최소 1자 이상 포함해주세요.',
        ],
        successSentence: '안전한 비밀번호입니다.',
    }, {
        type: 'button',
        attrType: 'button',
        className: 'primary',
        text: '초기화',
        doAction: target.askReset,
    }, {
        type: 'button',
        attrType: 'button',
        className: 'primary',
        text: '가입하기',
        doAction: target.validateForm,
    },
];

export default SignupFormData;
