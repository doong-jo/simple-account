/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import NodeBuilder from '../../../services/nodeBuilder.mjs';
import Constants from '../../../services/constants.mjs';
import Util from '../../../services/util.mjs';

import Modal from '../../components/modal.mjs';

import TodoMainView from './todo-main-html.mjs';

function doLogout(id, pwd) {
    // TODO : access server
    const success = () => {
        document.location.href = '/';
    };

    const fail = () => {
        alert('로그아웃에 실패했습니다.');
    };

    Util.getDataFormServer('POST', { id, pwd }, Constants.URL.LOGOUT, success, fail);
}

class TodoMain {
    constructor() {
        this.includedCSS = ['main', 'form', 'modal'];

        this.removeAllCSS = this.removeAllCSS.bind(this);
    }

    async render() {
        NodeBuilder.enableCSS('bootstrap');

        this.includedCSS.forEach((css) => {
            NodeBuilder.appendCSS(css);
        });

        this.view = TodoMainView;
        return this.view;
    }

    async afterRender() {
        this.mainView = document.querySelector('.main');
        this.logoutBtn = this.mainView.querySelector('#logout');

        const title = '로그인 성공';
        const content = '<img alt="fox" src="public/img/cute_fox.jpg" />';
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

        this.makeListener();
    }

    makeListener() {
        this.logoutBtn.addEventListener('click', doLogout);
    }

    removeAllCSS() {
        this.includedCSS.forEach((cssName) => {
            NodeBuilder.removeCSS(cssName);
        });
    }
}

export default TodoMain;
