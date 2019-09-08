const _ = require('./constants');

/**
 * 세션 관리를 담당하는 클래스
 *
 * @class SessionManager
 */
class SessionManager {
    constructor() {
        this.map = new Map();
    }


    /**
     * 세션을 유효하도록 Map에 생성한다.
     *
     * @param {string} sid 세션 아이디
     * @param {string} userId 유저 아이디
     * @memberof SessionManager
     */
    validate(sid, userId) {
        this.map.set(sid, {
            userId,
            timeout: setTimeout(() => {
                this.map.delete(sid);
                this.showStatus();
            }, _.SESSION_AGE),
        });
    }

    /**
     * 세션을 유효하지 않도록 Map에서 제거한다.
     *
     * @param {string} sid 세션 아이디
     * @memberof SessionManager
     */
    invalidate(sid) {
        const session = this.map.get(sid);
        if( session ) {
            clearTimeout(session.timeout);
            this.map.delete(sid);
            this.showStatus();
        }
    }

    /**
     * 세션이 expire가 되지 않도록 지속시킨다.
     *
     * @param {string} sid
     * @memberof SessionManager
     */
    maintain(sid) {
        const session = this.map.get(sid);

        this.showStatus();

        clearTimeout(session.timeout);
        this.map.set(sid, {
            userId: session.userId,
            timeout: setTimeout(() => {
                this.map.delete(sid);
                this.showStatus();
            }, _.SESSION_AGE),
        });
    }


    /**
     * 세션들을 테이블 형태로 콘솔에 보여준다.
     *
     * @memberof SessionManager
     */
    showStatus() {
        const tableData = [];
        this.map.forEach((session, key) => {
            tableData.push({ sid: key, userId: session.userId });
        });
        console.table(tableData);
    }

    /**
     * 세션의 존재 유무를 반환한다.
     *
     * @param {string} sid 대상 세션 아이디
     * @returns {boolean} 세션 존재유무
     * @memberof SessionManager
     */
    isExist(sid) {
        return this.map.get(sid) !== undefined;
    }
}

module.exports = new SessionManager();
