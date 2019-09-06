/* eslint-disable import/extensions */
import Main from './pages/main/main.mjs';
import TodoMain from './pages/todo-main/todo-main.mjs';
import Signup from './pages/signup/signup.mjs';
import Error404 from './pages/error404.mjs';

// 참조 : https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng
const routes = {
    '': new Main(),
    '#signup': new Signup(),
    '#todo-main': new TodoMain(),
};

let pageCssRemover;

const router = async () => {
    const content = null || document.getElementById('page_container');
    const parsedURL = window.location.hash;

    if (pageCssRemover) {
        pageCssRemover();
    }

    const page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.afterRender();

    pageCssRemover = page.removeAllCSS;
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
