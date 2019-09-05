const mongoose = require('mongoose');
const config = require('./config');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true,
};

mongoose.Promise = global.Promise;

function createConnection(addr) {
    return mongoose.createConnection(addr, option);
}

module.exports = createConnection(config[config.default]);

module.exports.on = createConnection;
