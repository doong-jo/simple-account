import Util from './services/util.mjs';

import Main from './views/pages/main.mjs';
import Signup from './views/pages/signup.mjs';
import Error404 from './views/pages/error404.mjs';

// 참조 : https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng
const routes = {
    '': Main, 
    '#signup': Signup, 
};

const router = async () => {
    const content = null || document.getElementById('page_container');
    const parsedURL = window.location.hash;

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);