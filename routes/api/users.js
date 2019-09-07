const userModel = require('../../models/users');

module.exports = {

    async create(snapshot, options, resultCallback) {
        await userModel.insert(snapshot, options, (data) => {
            resultCallback(data);
        });
    },

    getList(viewReq, options, resultCallback) {
        userModel.find(viewReq, options, (data) => {
            resultCallback(data);
        });
    },

    getFindOne(viewReq, options, resultCallback) {
        userModel.findOne(viewReq, options, (data) => {
            resultCallback(data);
        });
    },

    getCount(viewReq, options, resultCallback) {
        userModel.count(viewReq, options, (data) => {
            resultCallback(data);
        });
    },
};
