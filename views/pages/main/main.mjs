/* eslint-disable import/extensions */
import NodeBuilder from '../../services/nodebuilder.mjs';
import FormValidator from '../../services/form-validator.mjs';
import Constants from '../../services/constants.mjs';
import Util from '../../services/util.mjs';

import MainView from './main-html.mjs';

const MESSAGES = {
    FAIL_LOGIN: '로그인에 실패했습니다.',
    WRONG_ID: '올바르지 않은 아이디입니다.',
    WRONG_PW: '올바르지 않은 비밀번호 입니다.',
};

function doLogin(id, pwd) {
    // TODO : access server
    const success = () => {
        Util.goToPage(Constants.PAGE_HASH.TODO);
    };

    const fail = () => {
        alert(MESSAGES.FAIL_LOGIN);
    };

    Util.getDataFormServer('POST', { id, pwd }, Constants.REQUEST_URL.LOGIN, success, fail);
}

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
        this.idInput = document.querySelector('#f_id');
        this.pwInput = document.querySelector('#f_pw');

        this.makeValidator();
        NodeBuilder.makeSpanValidator(this.pwValidator,
            this.mainView.querySelector('.validator'));

        NodeBuilder.makeSpanValidator(this.idValidator,
            this.mainView.querySelector('.validator'));

        this.makeListener();
    }

    validate(idValidator, pwValidator) {
        return () => {
            const { 0: idInputVal, 1: pwInputVal } = [this.idInput.value, this.pwInput.value];

            if (FormValidator.showValidation(idValidator, idInputVal)
                && FormValidator.showValidation(pwValidator, pwInputVal)) {
                doLogin(idInputVal, pwInputVal);
            }
        };
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
        const signupBtn = this.mainView.querySelector('#signup');

        loginBtn.addEventListener('click',
            this.validate(this.idValidator, this.pwValidator));

        signupBtn.addEventListener('click',
            () => {
                Util.goToPage(Constants.PAGE_HASH.SIGNUP);
            });
    }

    removeAllCSS() {
        this.includedCSS.forEach((cssName) => {
            NodeBuilder.removeCSS(cssName);
        });
    }
}

export default Main;
