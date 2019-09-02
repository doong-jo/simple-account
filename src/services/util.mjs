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

    validateDate: (y, m, d) => new Date(`${y}-${m}-${d}`).getDate() === d,

    showValidation: (args, value) => {
        const { result, failCase } = args.validator(value);
        const { spanValidator, denySentence, successSentence } = args;
        const classes = spanValidator.classList;
        const addClass = result ? 'okay' : 'warning';
        const rmClass = addClass === 'okay' ? 'warning' : 'okay';

        if (value === '') {
            classes.remove('okay');
            classes.remove('warning');
            return false;
        }

        let caseInd = failCase;
        if (denySentence.length <= caseInd) {
            caseInd = denySentence.length - 1;
        }

        if (!classes.contains(addClass)) {
            classes.remove(rmClass);
            // restart animation, https://bit.ly/2UkQglI
            // eslint-disable-next-line no-void
            void spanValidator.offsetWidth;
            classes.add(addClass);
        }

        if (result) {
            spanValidator.innerHTML = successSentence;
            return true;
        }

        spanValidator.innerHTML = denySentence[caseInd];

        return false;
    },

    getUrlParameter: (param) => {
        const url = location.href;
        const parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == param.toUpperCase()) { 
                const returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            }
        }
    },
};

export default Util;
