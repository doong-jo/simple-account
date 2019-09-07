import _ from './constants.mjs';

const Util = {
    makeNumberArray(min, max, first = 0) {
        const arr = [...Array(max + 1).keys()].slice(min);
        if (first) { arr.unshift(first); }

        return arr;
    },

    debounce(fn, wait = 100) {
        let timeoutObject;

        return function tick(...args) {
            clearTimeout(timeoutObject);
            timeoutObject = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        };
    },
    
    async requestServer(method = 'GET', data = {}, url = '', fnSuccess = () => {}, fnFail = () => {}) {
        let targetURL = url;
        const fetchOptions = {};
        fetchOptions.method = method;
        fetchOptions.headers = { 'Content-Type': 'application/json' };

        if (method === 'POST') { fetchOptions.body = JSON.stringify(data); }
        else if (method === 'GET') {
            const getMethodUrl = new URL(`${_.HOST}${targetURL}`);
            getMethodUrl.search = new URLSearchParams(data);

            targetURL = getMethodUrl;
        }

        const responseData = await fetch(targetURL, fetchOptions);
        if (responseData.status === 200 || responseData.status === 201) {
            const response = await responseData.json();
            console.log('requestServer Response', response);
            if (response) fnSuccess(response);
            else fnFail(false);
            
        } else {
            fnFail(false);
        }
    },

    goToPage(hash) {
        document.location.href = hash;
    },
};

export default Util;
