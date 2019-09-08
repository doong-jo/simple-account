import _ from './constants.mjs';

/**
 * 일반적인 기능을 가지는 함수를 구현합니다.
 */
const Util = {
    /**
     * 최솟값과 최댓값, 시작값을 가지고 숫자 배열을 생성한다
     *
     * @param {number} min 최솟값
     * @param {number} max 최댓값
     * @param {number|string} [first=0] 시작값
     * @returns {array} 숫자 배열
     */
    makeNumberArray(min, max, first = 0) {
        const arr = [...Array(max + 1).keys()].slice(min);
        if (first) { arr.unshift(first); }

        return arr;
    },

    /**
     * debounce 기법을 구현한다.
     * : 이벤트의 연속적 발생을 마지막 이벤트 호출 발생을 가지고 값을 처리함
     *
     * @param {function} fn event listener
     * @param {number} [wait=100] delay
     * @returns {function} debounce가 적용된 event listner
     */
    debounce(fn, wait = 100) {
        let timeoutObject;

        return function tick(...args) {
            clearTimeout(timeoutObject);
            timeoutObject = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        };
    },
    
    /**
     * data를 서버에 요청하고 응답받는다.
     *
     * @param {string} [method='GET'] 요청 메소드
     * @param {object} [data={}] 요청 데이터
     * @param {string} [url=''] 서버 url
     * @param {function} [fnSuccess=() => {}] 성공 시 수행 함수
     * @param {function} [fnFail=() => {}] 실패 시 수행 함수
     */
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
            if (response) {
                fnSuccess(response);
            }
            else { 
                fnFail(false);
            }
        } else {
            fnFail(false);
        }
    },

    /**
     * url을 수정해 페이지를 이동시킨다.
     *
     * @param {string} hash
     */
    goToPage(hash) {
        document.location.href = hash;
    },
};

export default Util;
