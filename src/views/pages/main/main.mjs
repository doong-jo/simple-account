/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import NodeBuilder from '../../../services/nodeBuilder.mjs';
import FormValidator from '../../../services/form-validator.mjs';

import MainView from './main-html.mjs';

const doLogin = () => {
    console.log('login successfully!');
};

class Main {
    async render() {
        NodeBuilder.enableCSS('bootstrap');

        NodeBuilder.appendCSS('main');

        this.view = MainView;
        return this.view;
    }

    async afterRender() {
        this.mainView = document.querySelector('.main');

        const loginBtn = document.querySelector('#login');
        loginBtn.addEventListener('click', doLogin);
    }
}

export default Main;
