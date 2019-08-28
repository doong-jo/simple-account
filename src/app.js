import Util from './services/util.js';

import Main from './views/pages/Main.js';
import Signup from './views/pages/Signup.js';
import Login from './views/pages/Login.js';

// 참조 : https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng
const routes = {
    '/': Main, 
    '/signup': Signup, 
    '/login': Login, 
};

const router = async () => {
    const content = document.getElementById('page_container');
    const parsedURL = Util.parseURL();
    console.log(parsedURL);

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);