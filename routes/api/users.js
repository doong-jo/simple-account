const userModel = require('../../models/users');
const Util = require('../../services/util');

module.exports = {

    create: (snapshot, options, resultCallback) => {
        userModel.insert(snapshot, options, (data) => {
            resultCallback(data);
        });
    },

    getList: (viewReq, options, resultCallback) => {
        console.log(viewReq);
        userModel.find(viewReq, options, (data) => {
            resultCallback(data);
        });
    },

    getCount: (viewReq, options, resultCallback) => {
        userModel.count(viewReq, options, (data) => {
            resultCallback(data);
        });
    },
};
