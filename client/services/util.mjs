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

    getDataFormServer(method = 'GET', data = {}, url = '', fnSuccess = () => {}, fnFail = () => {}) {
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((json) => {
                    if (json) {
                        console.log(json);
                        fnSuccess();
                        return;
                    }
                    fnFail();
                });
            } else {
                console.error(res.statusText);
            }
        }).catch((err) => console.error(err));
    },

    goToPage(hash) {
        document.location.href = hash;
    },
};

export default Util;
