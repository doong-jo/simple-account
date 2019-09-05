const db = require('./schema/user_info').getDB();

module.exports = {
    find(query, options, resultCallback) {
        db.users.find(query, options, {})
            .limit(options.limit || 0)
            .skip(options.skip || 0)
            .sort(options.sort || {})
            .exec((err, data) => {
                if (err) {
                    console.error('users-find', err);
                    resultCallback(false);
                } else { resultCallback(data); }
            });
    },

    insert(snapshot, options, resultCallback) {
        const snapShot = new db.users(snapshot);

        snapShot.save((err) => {
            if (err) { 
                console.error('users-insert', err);
                resultCallback(false);
            } else { resultCallback(true); }
        });
    },
};
