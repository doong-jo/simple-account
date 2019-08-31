import NodeBuilder from '../../services/nodebuilder.mjs';
import Form from '../components/form.mjs';
import Modal from '../components/modal.mjs';

import TermContent from '../modal/term.mjs';
import ResetContent from '../modal/reset.mjs';
import DenySignupContent from '../modal/deny-signup.mjs';
import FormValidator from '../../services/form-validator.mjs';

const Signup = {
    render : async () => {
        NodeBuilder.disalbeCSS('bootstrap');
        
        NodeBuilder.appendCSS('signup');
        NodeBuilder.appendCSS('form');
        NodeBuilder.appendCSS('tag');
        NodeBuilder.appendCSS('modal');

        let view =  /*html*/`
        <header class="title">
            <h1>회원가입</h1>
        </header>
        <section class="form-container">
            <div class="form-flex-items"></div>
            <div class="form-flex-items double">
                <form class="form-signup"></form>
            </div>
            <div class="form-flex-items"></div>
        </section>
        <footer></footer>
        `
        return view;
    },

    after_render: async function() {
        this.termRead = false;

        this.makeListners();

        this.signupForm = this.buildSignupForm();
        this.termModal = this.buildTermModal();
        this.resetModal = this.buildResetModal();
        this.signupDenyModal = this.buildSignupDenyModal();

        this.termChkbox = document.querySelector('#f_agree');

        this.registerEvents();
    },

    makeListners() {
        this.checkScroll = function(e) {
            const thisTextArea = e.target;
            const offset = thisTextArea.offsetHeight;

            if (thisTextArea.scrollHeight <= (thisTextArea.scrollTop+offset)) {
                const agreeBtn = this.termModal.container.querySelector('.agree');
                agreeBtn.disabled = false;
                this.termRead = true;
            }
        }.bind(this);

        this.agreeTerm = function() {
            if( this.termRead ) {
                this.termModal.toggle(false);
                this.termChkbox.checked = true;
            }
        }.bind(this);

        this.openTerm = function () {
            this.termModal.toggle(true); 
        }.bind(this);

        this.hideTerm = function () { 
            this.termModal.toggle(false);
        }.bind(this);

        this.askReset = function () {
            this.resetModal.toggle(true);
        }.bind(this);

        this.resetForm = function () {
            this.resetModal.toggle(false);
            this.signupForm.reset();
        }.bind(this);

        this.validateForm = function () {
            this.signupDenyModal.toggle(true);
            const denySpan = document.querySelector('.deny-signup-sentence');
            denySpan.innerHTML = this.signupForm.denySentence === '' ?
                !this.termChkbox.checked ? 
                    '약관에 동의해주세요.' : '' 
                        : this.signupForm.denySentence;
        }.bind(this);
    },

    registerEvents: function() {
        const termTextArea = this.termModal.container.querySelector('textarea');

        termTextArea.addEventListener('scroll', this.checkScroll);
    },

    resetForm() {
        console.log('reset form');
    },

    buildSignupForm: function () {
        const sampleValidator = (s) => { console.log('this is validate function'); };

        const formComp = new Form('form-signup');

        let itemsWillMade = [
            {
                type: 'label',
                for: 'f_id',
                innerHTML : '아이디',
            }, {
                type: 'input',
                inputType: 'text',
                nameAndId: 'f_id',
                nick: '아이디',
                placeholder : '5~20자, 영 소문자, 숫자, (_, -)만 사용 가능',
                validator: FormValidator.checkId,
            }, {
                type: 'label',
                for: 'f_pw',
                innerHTML : '비밀번호'
            }, {
                type: 'input',
                inputType: 'password',
                nameAndId: 'f_pw',
                nick: '비밀번호',
                placeholder : '8~16자, 영 대소문자, 숫자, 특수문자의 조합',
                validator: FormValidator.checkPw,
            }, {
                type: 'label',
                for: 'f_pw_confirm',
                innerHTML : '비밀번호 재확인'
            }, {
                type: 'input',
                inputType: 'password',
                nameAndId: 'f_pw_confirm',
                nick: '비밀번호 재확인',
                placeholder : '비밀번호를 한번 더 입력해주세요.',
                validator: FormValidator.checkPw,
            }, {
                type: 'label',
                for: 'f_name',
                innerHTML : '이름'
            }, {
                type: 'input',
                inputType: 'text',
                nameAndId: 'f_name',
                nick: '이름',
                placeholder : '2~20자, 영 대소문자, 한글',
                validator: sampleValidator,
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
                        nick: '출생연도',
                        placeholder : '년(4자)',
                        validator: sampleValidator,
                    }, {
                        type: 'select',
                        nameAndId: 'f_birth_month',
                        nick: '출생월',
                        values: ['월', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        selectedInd: 0,
                        validator: sampleValidator,
                    }, {
                        type: 'input',
                        inputType: 'number',
                        nameAndId: 'f_birth_day',
                        nick: '출생일',
                        placeholder : '일',
                        validator: sampleValidator,
                    },
                ],
            }, {
                type: 'label',
                for: 'f_sex',
                innerHTML : '성별'
            }, {
                type: 'select',
                nameAndId: 'f_sex',
                nick: '성별',
                values: ['성별', '남', '여'],
                selectedInd: 0,
                validator: sampleValidator,
            }, {
                type: 'label',
                for: 'f_email',
                innerHTML : '이메일',
            }, {
                type: 'input',
                inputType: 'email',
                nameAndId: 'f_email',
                nick: '이메일',
                placeholder : 'xxx@xxx.xxx',
                validator: sampleValidator,
            }, {
                type: 'label',
                for: 'f_phone',
                innerHTML : '휴대전화'
            }, {
                type: 'input',
                inputType: 'tel',
                nameAndId: 'f_phone',
                nick: '휴대전화',
                placeholder : '- 없이 입력해주세요. 예)01012345678',
                validator: sampleValidator,
            }, {
                type: 'label',
                for: 'f_favorite',
                innerHTML : '관심사'
            }, {
                type: 'tag-list',
                id: 'f_favorite',
                nick: '관심사',
                minTags: 3,
                validator: sampleValidator,
            }, {
                type: 'checkboxWithText',
                inputType: 'checkbox',
                checkboxPos: 'right',
                text: '약관에 동의합니다',
                underlined: true,
                nameAndId: 'f_agree',
                textOnClick: this.openTerm,
                textClassName: 'label-checkbox',
                disabled: true,
                nick: '약관',
                failSentence: '약관에 동의해주세요.',
                validator: sampleValidator,
            }, {
                type: 'element-rows',
                elements: [
                    { 
                        type: 'button',
                        attrType: 'button',
                        className: 'primary',
                        text: '초기화',
                        doAction: this.askReset,
                    }, {
                        type: 'button',
                        attrType: 'button',
                        className: 'primary',
                        text: '가입하기',
                        doAction: this.validateForm,
                    }
                ]
            }
        ];
        return formComp.makeForm(itemsWillMade);
    },

    buildTermModal: function () {
        const { title, content } = TermContent,
            termModal = new Modal('term'),
            options = {
            width: '40rem',
            height: '30rem',
            title,
            content,
            footer: {
                confirmBtn: {
                    text: '동의',
                    className: 'agree',
                    disabled: true,
                    doAction: this.agreeTerm,
                },
            },
        };
        return termModal.makeModal(options);
    },

    buildResetModal: function () {
        const { title, content } = ResetContent,
            resetModal = new Modal('reset'),
            options = {
            width: '30rem',
            title,
            content,
            footer: {
                confirmBtn: {
                    text: '확인',
                    doAction: this.resetForm,
                },
                cancleBtn: {
                    text: '취소',
                },
            },
        };
        return resetModal.makeModal(options);
    },

    buildSignupDenyModal: function() {
        const { title, content } = DenySignupContent,
            signupDenyModal = new Modal('deny-signup'),
            options = {
            width: '30rem',
            title,
            content,
            footer: {
                cancleBtn: {
                    text: '확인',
                },
            },
        };
        return signupDenyModal.makeModal(options);
    }
};

export default Signup;