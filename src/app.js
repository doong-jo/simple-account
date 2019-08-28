// 참조 : https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng
const routes = {
    '/': Main, 
    '/signup': Signup, 
    '/login': Login, 
};

const router = async () => {
    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);