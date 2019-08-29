import Util from './services/util.mjs';

import Main from './views/pages/Main.mjs';
import Signup from './views/pages/Signup.mjs';
import Error404 from './views/pages/Error404.mjs';

// 참조 : https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng
const routes = {
    '/': Main, 
    '/signup': Signup, 
};

const router = async () => {
    const content = document.getElementById('page_container');
    const parsedURL = Util.parseURL();
    console.log(parsedURL);

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('load', router);