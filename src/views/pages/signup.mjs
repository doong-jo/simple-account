import NodeBuilder from '../../services/nodebuilder.mjs';
import Form from '../components/form.mjs';

const Signup = {
    render : async () => {
        NodeBuilder.appendCSS('signup');
        NodeBuilder.appendCSS('form');

        let view =  /*html*/`
        <div class="form-container">
            <div class="form-flex-items"></div>
            <div class="form-flex-items">
                <div class="title">
                <h2>회원가입</h2>
                </div>
                <form class="form-signup">
                </form>
            </div>
            <div class="form-flex-items"></div>
        </div>
        `
        return view;
    },

    after_render: async function() {
        this.buildSignupForm();
    },

    buildSignupForm: () => {
        Form.initializeByClassName('form-signup');
        let itemsWillMade = [
            {
                type: 'label',
                for: 'f_id',
                innerHTML : '아이디'
            }, {
                type: 'input',
                inputType: 'text',
                nameAndId: 'f_id',
                placeholder : '5~20자, 영 소문자, 숫자, (_, -)만 사용 가능'
            }, {
                type: 'label',
                for: 'f_pw',
                innerHTML : '비밀번호'
            }, {
                type: 'input',
                inputType: 'password',
                nameAndId: 'f_pw',
                placeholder : '8~16자, 영 대문자, 소문자, 숫자, 특수문자의 조합'
            }, {
                type: 'label',
                for: 'f_pw_confirm',
                innerHTML : '비밀번호 재확인'
            }, {
                type: 'input',
                inputType: 'password',
                nameAndId: 'f_pw_confirm',
                placeholder : '비밀번호를 한번 더 입력해주세요.'
            }, {
                type: 'label',
                for: 'f_name',
                innerHTML : '이름'
            }, {
                type: 'input',
                inputType: 'text',
                nameAndId: 'f_name',
                placeholder : '이름을 입력해주세요.'
            }, {
                type: 'label',
                for: 'f_birth',
                innerHTML : '생년월일'
            }, {
                type: 'element-rows',
                elements: [
                    {
                        type: 'input',
                        inputType: 'number',
                        nameAndId: 'f_birth_year',
                        placeholder : '출생연도 (4자)'
                    }, {
                        type: 'select',
                        nameAndId: 'f_birth_month',
                        values: ['월', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        selectedInd: 0,
                    }, {
                        type: 'input',
                        inputType: 'number',
                        nameAndId: 'f_birth_day',
                        placeholder : '일'
                    },
                ],
            }, {
                type: 'label',
                for: 'f_sex',
                innerHTML : '성별'
            }, {
                type: 'select',
                nameAndId: 'f_sex',
                values: ['성별', '남', '여'],
                selectedInd: 0,
            }, {
                type: 'label',
                for: 'f_email',
                innerHTML : '이메일'
            }, {
                type: 'input',
                inputType: 'email',
                nameAndId: 'f_email',
                placeholder : '이메일을 입력해주세요.'
            }, {
                type: 'label',
                for: 'f_phone',
                innerHTML : '휴대전화'
            }, {
                type: 'input',
                inputType: 'tel',
                nameAndId: 'f_phone',
                placeholder : '휴대전화를 입력해주세요.'
            }, {
                type: 'label',
                for: 'f_favorite',
                innerHTML : '관심사'
            },
            //  {
            //     type: 'tag_list',
            //     defaultValues: [],
            //     Id: 'f_phone',
            // },
            {
                type: 'checkboxWithText',
                inputType: 'checkbox',
                checkboxPos: 'right',
                text: '약관에 동의합니다',
                value: false,
                underlined: true,
                nameAndId: 'f_agree',
                disabled: true,
            }, {
                type: 'element-rows',
                elements: [
                    { 
                        type: 'button',
                        className: 'primary',
                        text: '초기화',
                        doAction: () => {
                            console.log('초기화하기');
                        }
                    }, {
                        type: 'button',
                        className: 'primary',
                        text: '가입하기',
                        doAction: () => {
                            console.log('가입하기');
                        }
                    }
                ]
            }
        ];
        Form.makeForm(itemsWillMade);
    },
};

export default Signup;