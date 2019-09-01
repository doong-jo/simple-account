const Util = {
    makeNumberArray(min, max, first = 0) {
        const arr = [...Array(max + 1).keys()].slice(min);
        if( first ) { arr.unshift(first); }

        return arr;
    },

    debounce(fn, wait = 100) {
        let timeoutObject;

        return function(...args) {
            clearTimeout(timeoutObject);
            timeoutObject = setTimeout(() => {
                fn.apply(this, args);
            }, wait)
        }
    }
};

export default Util;