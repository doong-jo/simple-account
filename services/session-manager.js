class SessionManager {
    constructor() {
        this.map = new Map();
    }

    validate(sid, userId) {
        this.map.set(sid, userId);
    }

    invalidate(sid) {
        this.map.delete(sid);
    }

    showStatus() {
        const tableData = [];
        this.map.forEach((value, key) => {
            tableData.push({ sid: key, userId: value });
        });
        console.table(tableData);
    }
}

module.exports = new SessionManager();
