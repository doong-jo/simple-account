const _ = require('./constants');

class SessionManager {
    constructor() {
        this.map = new Map();
    }

    validate(sid, userId) {
        this.map.set(sid, {
            userId,
            timeout: setTimeout(() => {
                this.map.delete(sid);
                this.showStatus();
            }, _.SESSION_AGE),
        });
    }

    invalidate(sid) {
        const session = this.map.get(sid);
        if( session ) {
            clearTimeout(session.timeout);
            this.map.delete(sid);
            this.showStatus();
        }
    }

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

    showStatus() {
        const tableData = [];
        this.map.forEach((session, key) => {
            tableData.push({ sid: key, userId: session.userId });
        });
        console.table(tableData);
    }

    isExist(sid) {
        return this.map.get(sid) !== undefined;
    }
}

module.exports = new SessionManager();
