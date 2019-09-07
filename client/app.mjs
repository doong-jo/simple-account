import Util from './services/util.mjs';
import _ from  './services/constants.mjs';

import Main from './pages/main/main.mjs';
import TodoMain from './pages/todo-main/todo-main.mjs';
import Signup from './pages/signup/signup.mjs';
import Error404 from './pages/error404.mjs';

let toggleEachPageCSS = () => {};
let alreadyAuth = false;

const router = async () => {
    const routes = {
        '': { page: new Main(), auth: false },
        '#signup': { page: new Signup(), auth: false },
        '#todo-main': { page: new TodoMain(), auth: true },
    };

    const content = null || document.getElementById('page_container');
    const parsedURL = window.location.hash;

    async function render() {
        if (toggleEachPageCSS) { toggleEachPageCSS(); }

        const page = routes[parsedURL].page || Error404;
        content.innerHTML = await page.render();
        await page.afterRender();

        toggleEachPageCSS = page.disableAllCSS;
    }

    if (alreadyAuth) {
        render();
        alreadyAuth = false;
        return;
    }

    if (routes[parsedURL].auth) {
        await Util.requestServer('POST', {}, '/auth/passport', render, () => {
            document.location.href = _.PAGE_HASH.LOGIN;
        });
        return;
    }

    await Util.requestServer('POST', {}, '/auth/passport', () => {
        document.location.href = _.PAGE_HASH.TODO;
        alreadyAuth = true;
    }, render);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
