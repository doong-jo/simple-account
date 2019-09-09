const mongoose = require('mongoose');
const mongoOption = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true,
};

exports.setTimeout = function () {
    return global.setTimeout.apply(global, arguments);
};

jest.setTimeout(30000);

beforeAll(async (done) => {
    await mongoose.connect(process.env.MONGODB_URI, mongoOption, function (error) {
        if (error) throw error; // Handle failed connection
        console.log('conn ready:  ' + mongoose.connection.readyState);
        done();
    });
});

afterAll((done) => {
    mongoose.disconnect(done);
});