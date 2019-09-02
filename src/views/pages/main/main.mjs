/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import NodeBuilder from '../../../services/nodeBuilder.mjs';
import FormValidator from '../../../services/form-validator.mjs';
import Util from '../../../services/util.mjs';

import Modal from '../../components/modal.mjs';

import MainView from './main-html.mjs';

const doLogin = () => {
    // TODO : access server
    // dumy
    document.querySelector('.form-signin').innerHTML = '<h1>메인화면</h1>';

    const title = '로그인 성공';
    const content = '<img src="public/img/cute_fox.jpg" />';
    const signupDenyModal = new Modal('success-login');
    const options = {
        title,
        content,
        footer: {
            cancleBtn: {
                type: 'button',
                text: '확인',
            },
        },
    };
    signupDenyModal.makeModal(options).toggle(true);
};

const validate = (idValidator, pwValidator) => ((e) => {
    const idInputVal = document.querySelector('#f_id').value;
    const pwInputVal = document.querySelector('#f_pw').value;

    if (Util.showValidation(idValidator, idInputVal)
        && Util.showValidation(pwValidator, pwInputVal)) {
        doLogin();
    }
});

class Main {
    constructor() {
        this.includedCSS = ['main', 'form', 'modal'];

        this.removeAllCSS = this.removeAllCSS.bind(this);
    }

    async render() {
        NodeBuilder.enableCSS('bootstrap');

        this.includedCSS.forEach((css) => {
            NodeBuilder.appendCSS(css);
        });

        this.view = MainView;
        return this.view;
    }

    async afterRender() {
        this.mainView = document.querySelector('.main');
        const hasUser = this.realizeParameter();

        if (hasUser) {
            doLogin();
        } else {
            this.makeValidator();
            NodeBuilder.makeSpanValidator(this.pwValidator,
                this.mainView.querySelector('.validator'));

            NodeBuilder.makeSpanValidator(this.idValidator,
                this.mainView.querySelector('.validator'));

            this.makeListener();
        }
    }

    realizeParameter() {
        this.userId = Util.getUrlParameter('id');

        return this.userId;
    }

    makeValidator() {
        this.idValidator = {
            validator: FormValidator.checkId,
            denySentence: ['올바르지 않은 아이디입니다.'],
            successSentence: '&nbsp;',
        };

        this.pwValidator = {
            validator: FormValidator.checkPw,
            denySentence: ['올바르지 않은 비밀번호 입니다.'],
            successSentence: '&nbsp;',
        };
    }

    makeListener() {
        const loginBtn = this.mainView.querySelector('#login');

        loginBtn.addEventListener('click',
            validate(this.idValidator, this.pwValidator));
    }

    removeAllCSS() {
        this.includedCSS.forEach((cssName) => {
            NodeBuilder.removeCSS(cssName);
        });
    }
}

export default Main;
