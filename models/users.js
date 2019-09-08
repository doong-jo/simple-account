const db = require('./schema/user_info').getDB();


module.exports = {
    find(query, projection, options) {
        return db.users.find(query, projection, options).exec();
    },

    findOne(query, projection, options) {
        return db.users.findOne(query, projection, options).exec();
    },

    insert(reqSnapshot, options) {
        const snapshopt = new db.users(reqSnapshot);
        return snapshopt.save(options);
    },

    count(query) {
        return db.users.countDocuments(query).exec();
    }
};
