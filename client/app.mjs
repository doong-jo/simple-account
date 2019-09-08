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

    // 각 페이지에 맞는 렌더링을 수행한다.
    async function render() {
        if (toggleEachPageCSS) { toggleEachPageCSS(); }

        const page = routes[parsedURL].page || Error404;
        content.innerHTML = await page.render();
        await page.afterRender();

        toggleEachPageCSS = page.disableAllCSS;
    }

    // 이미 passport를 확인했다면 통과시킨다.
    if (alreadyAuth) {
        render();
        alreadyAuth = false;
        return;
    }

    // passport가 필요한 페이지라면 검사한다.
    if (routes[parsedURL].auth) {
        await Util.requestServer('POST', {}, _.REQUEST_URL.PASSPORT, render, () => {
            document.location.href = _.PAGE_HASH.LOGIN;
        });
        return;
    }

    // passport 검사가 필요하지 않다면 그대로 렌더링한다.
    render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
