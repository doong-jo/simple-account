/* eslint-disable import/extensions */
import Util from '../../services/util.mjs';
import NodeBuilder from '../../services/nodebuilder.mjs';
import Constants from '../../services/constants.mjs';
import Form from '../../components/form.mjs';
import Modal from '../../components/modal.mjs';

import TermContent from '../../modal/term.mjs';
import ResetContent from '../../modal/reset.mjs';
import DenySignupContent from '../../modal/deny-signup.mjs';
import SignupFormData from './signup-form-data.mjs';

import SignupView from './signup-html.mjs';

function buildSignupDenyModal() {
    const { title, content } = DenySignupContent;
    const signupDenyModal = new Modal('deny-signup');
    const options = {
        width: '30rem',
        title,
        content,
        footer: {
            cancleBtn: {
                attrType: 'button',
                text: '확인',
            },
        },
    };
    return signupDenyModal.makeModal(options);
}

class Signup {
    constructor() {
        this.includedCSS = ['signup', 'form', 'tag', 'modal'];

        this.removeAllCSS = this.removeAllCSS.bind(this);
    }

    async render() {
        NodeBuilder.disalbeCSS('bootstrap');

        this.includedCSS.forEach((css) => {
            NodeBuilder.appendCSS(css);
        });

        this.includedCSS = ['signup', 'form', 'tag', 'modal'];

        this.view = SignupView;
        return this.view;
    }

    async afterRender() {
        this.MIN_FAVOR_NUM = 3;
        this.termRead = false;

        this.makeListners();

        this.signupForm = this.buildSignupForm();
        this.termModal = this.buildTermModal();
        this.resetModal = this.buildResetModal();
        this.signupDenyModal = buildSignupDenyModal();

        this.signupFormContainer = this.signupForm.container;
        this.pwInput = this.signupFormContainer.querySelector('#f_pw');
        this.pwConfirmInput = this.signupFormContainer.querySelector('#f_pw_confirm');
        this.yearOfBirth = this.signupFormContainer.querySelector('#f_birth_year');
        this.monthOfBirth = this.signupFormContainer.querySelector('#f_birth_month');
        this.dayOfBirth = this.signupFormContainer.querySelector('#f_birth_day');
        this.termChkbox = this.signupFormContainer.querySelector('#f_agree');

        this.denySpan = this.signupDenyModal.container.querySelector('.deny-signup-sentence');
        this.agreeBtn = this.termModal.container.querySelector('.agree');
        this.termTextArea = this.termModal.container.querySelector('textarea');

        this.registerEvents();
    }

    makeListners() {
        this.checkScroll = Util.debounce((e) => {
            const { scrollHeight, scrollTop, offsetHeight } = e.target;

            if (scrollHeight <= (scrollTop + offsetHeight)) {
                this.agreeBtn.disabled = false;
                this.termRead = true;
            }
        }, 100);

        this.checkConfirmPw = () => ({
            result: this.pwInput.value === this.pwConfirmInput.value,
            failCase: 0,
        });

        this.checkMonthOfBirth = () => {
            for (let day = 32; day >= 28; day -= 1) {
                if (Util.validateDate(this.yearOfBirth.value, this.monthOfBirth.value, day)) {
                    const days = Util.makeNumberArray(1, day, '일');
                    NodeBuilder.makeOptionsOfSelect(this.dayOfBirth, days);
                    break;
                }
            }
        };

        this.agreeTerm = () => {
            if (this.termRead) {
                this.termModal.toggle(false);
                this.termChkbox.checked = true;
            }
        };

        this.openTerm = () => {
            this.termModal.toggle(true);
        };

        this.hideTerm = () => {
            this.termModal.toggle(false);
        };

        this.askReset = () => {
            this.resetModal.toggle(true);
        };

        this.resetForm = () => {
            this.resetModal.toggle(false);
            this.signupForm.reset();
            this.termRead = false;
            this.termTextArea.scrollTop = 0;
            this.agreeBtn.disabled = true;
        };

        this.validateForm = () => {
            const denyStr = this.signupForm.denySentence;

            if (denyStr === 'success') {
                const successFn = (formData) => {
                    document.location.href = './#todo-main';
                };
        
                const failFn = () => {
                    alert('가입에 실패했습니다.');
                };

                this.signupForm.submit(Constants.URL.SIGNUP, successFn, failFn);
                return;
            }

            this.signupDenyModal.toggle(true);
            this.denySpan.innerHTML = denyStr;
        };
    }

    registerEvents() {
        this.termTextArea.addEventListener('scroll', this.checkScroll);
        this.monthOfBirth.addEventListener('change', this.checkMonthOfBirth);
    }

    buildSignupForm() {
        const formComp = new Form('signup-form');
        return formComp.build(SignupFormData(this));
    }

    buildTermModal() {
        const { title, content } = TermContent;
        const termModal = new Modal('term');
        const options = {
            width: '40rem',
            height: '30rem',
            title,
            content,
            footer: {
                confirmBtn: {
                    attrType: 'button',
                    text: '동의',
                    className: 'agree',
                    disabled: true,
                    doAction: this.agreeTerm,
                },
            },
        };
        return termModal.makeModal(options);
    }

    buildResetModal() {
        const { title, content } = ResetContent;
        const resetModal = new Modal('reset');
        const options = {
            width: '30rem',
            title,
            content,
            footer: {
                confirmBtn: {
                    attrType: 'button',
                    text: '확인',
                    doAction: this.resetForm,
                },
                cancleBtn: {
                    attrType: 'button',
                    text: '취소',
                },
            },
        };
        return resetModal.makeModal(options);
    }

    removeAllCSS() {
        this.includedCSS.forEach((cssName) => {
            NodeBuilder.removeCSS(cssName);
        });
    }
}

export default Signup;
