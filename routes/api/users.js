const userModel = require('../../models/users');

module.exports = {

    create(snapshot, options, resultCallback) {
        userModel.insert(snapshot, options, (data) => {
            resultCallback(data);
        });
    },

    getList(viewReq, options, resultCallback) {
        console.log(viewReq);
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
