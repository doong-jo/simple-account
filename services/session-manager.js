const _ = require('./constants');

class SessionManager {
    constructor() {
        this.map = new Map();
    }

    validate(sid, userId) {
        this.map.set(sid, {
            userId,
            timeout: setTimeout(() => {
                console.log('------------------session-manager expire---------------');
                console.log('expire sid', sid);
                this.map.delete(sid);
                this.showStatus();
            }, _.SESSION_AGE),
        });
    }

    invalidate(sid) {
        this.map.delete(sid);
    }

    maintain(sid) {
        console.log('------------------session-manager maintain---------------');
        const getObject = this.map.get(sid);

        this.showStatus();

        clearTimeout(getObject.timeout);
        this.map.set(sid, {
            userId: getObject.userId,
            timeout: setTimeout(() => {
                console.log('------------------session-manager expire---------------');
                console.log('expire sid', sid);
                this.map.delete(sid);
                this.showStatus();
            }, _.SESSION_AGE),
        });
    }

    showStatus() {
        const tableData = [];
        this.map.forEach((value, key) => {
            tableData.push({ sid: key, userId: value });
        });
        console.table(tableData);
    }

    isExist(sid) {
        return this.map.get(sid) !== undefined;
    }
}

module.exports = new SessionManager();
