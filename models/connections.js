const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true,
};

mongoose.Promise = global.Promise;

/**
 * DB connection을 생성한다.
 *
 * @param {string} addr 연결 주소
 * @returns {Connection} Connection 객체
 */
function createConnection(addr) {
    return mongoose.createConnection(addr, option);
}

module.exports = createConnection(process.env.MONGODB_URI);

module.exports.on = createConnection;
