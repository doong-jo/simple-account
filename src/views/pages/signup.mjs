import Util from '../../services/util.mjs';
import NodeBuilder from '../../services/nodebuilder.mjs';
import Form from '../components/form.mjs';
import Modal from '../components/modal.mjs';

import TermContent from '../modal/term.mjs';
import ResetContent from '../modal/reset.mjs';
import DenySignupContent from '../modal/deny-signup.mjs';
import SignupFormData from './signup-form-data.mjs';

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
        <section class="signup">
            <div class="form-container">
                <div class="form-flex-items"></div>
                <div class="form-flex-items center">
                    <form id="signup-form"></form>
                </div>
                <div class="form-flex-items"></div>
            </div>
            <div id="term" class="modal-container"></div>
            <div id="reset" class="modal-container"></div>
            <div id="deny-signup" class="modal-container"></div>
        </section>
        `
        return view;
    },

    after_render: async function() {
        this.MIN_FAVOR_NUM = 3;
        this.termRead = false;

        this.makeListners();

        this.signupForm = this.buildSignupForm();
        this.termModal = this.buildTermModal();
        this.resetModal = this.buildResetModal();
        this.signupDenyModal = this.buildSignupDenyModal();

        this.signupFormContainer = this.signupForm.container;
        this.pwInput = this.signupFormContainer.querySelector('#f_pw');
        this.pwConfirmInput = this.signupFormContainer.querySelector('#f_pw_confirm');
        this.yearOfBirth = this.signupFormContainer.querySelector('#f_birth_year');
        this.monthOfBirth = this.signupFormContainer.querySelector('#f_birth_month');
        this.dayOfBirth = this.signupFormContainer.querySelector('#f_birth_day');
        this.termChkbox = this.signupFormContainer.querySelector('#f_agree');

        this.denySpan = this.signupDenyModal.container.querySelector('.deny-signup-sentence');
        this.agreeBtn = this.termModal.container.querySelector('.agree');

        this.registerEvents();
    },

    makeListners() {
        this.checkScroll = Util.debounce((e) => {
            const { scrollHeight, scrollTop, offsetHeight } = e.target;

            if (scrollHeight <= (scrollTop + offsetHeight)) {
                this.agreeBtn.disabled = false;
                this.termRead = true;
            }
        }, 200);

        this.checkConfirmPw = () => {
            return { 
                result : this.pwInput.value === this.pwConfirmInput.value,
                failCase: 0
            };
        };

        this.checkMonthOfBirth = () => {
            for(let day=32; day>=28; day--) {
                if( this.checkDayOfBirth(
                        this.yearOfBirth.value, 
                        this.monthOfBirth.value, 
                        day
                    ) ) {
                    const days = Util.makeNumberArray(1, day, '일');
                    NodeBuilder.makeOptionsOfSelect(this.dayOfBirth, days);
                    break;
                }
            }
        };

        this.checkDayOfBirth = (y, m, d) => {
            return FormValidator.checkYearOfBirth(y) && 
                FormValidator.checkMonthOfBirth(m) &&
                new Date(`${y}-${m}-${d}`).getDate() === d;
        },

        this.agreeTerm = () => {
            if( this.termRead ) {
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
        };

        this.validateForm = () => {
            const denyStr = this.signupForm.denySentence;
            if( denyStr === 'success') { 
                this.signupForm.submit(/* server url */);
                return false;
            }

            this.signupDenyModal.toggle(true);
            this.denySpan.innerHTML = denyStr;
        };
    },

    registerEvents: function() {
        const termTextArea = this.termModal.container.querySelector('textarea');

        termTextArea.addEventListener('scroll', this.checkScroll);

        this.yearOfBirth.addEventListener('input', this.checkMonthOfBirth);
        this.monthOfBirth.addEventListener('change', this.checkMonthOfBirth);
    },

    buildSignupForm: function () {
        const formComp = new Form('signup-form');
        return formComp.build(SignupFormData(this));
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
                        type: 'button',
                        text: '확인',
                        doAction: this.resetForm,
                    },
                    cancleBtn: {
                        type: 'button',
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
                        type: 'button',
                        text: '확인',
                    },
                },
        };
        return signupDenyModal.makeModal(options);
    }
};

export default Signup;