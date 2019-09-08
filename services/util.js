/**
 * 일반적인 기능을 가지는 함수를 구현합니다.
 */
const Util = {

    /**
     * JSON으로 파싱하고 실패한다면 그대로 값을 반환합니다.
     *
     * @param {*} val 파싱하려는 값
     * @returns {*} JSON 파싱 값
     */
    parseJSON(val) {
        try {
            return JSON.parse(val);
        } catch(e) {
            return val;
        }
    },
};

module.exports = Util;
