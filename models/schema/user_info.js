const mongoose = require('mongoose');
const mongooseSchema = require('mongoose').Schema;

// mongo "mongodb+srv://boostcamp-hv6vm.mongodb.net/test" --username admin
const mongooseCon = require('../connections');

const userFields = {
    id: String,
    pwd: String,
    name: String,
    birth: String,
    sex: String,
    email: String,
    phone: String,
    favorite: Array,
};

const userSchema = new mongooseSchema(userFields, {
    collection: 'users',
    bufferCommands: false,
});

const db = {
    users: mongooseCon.model('users', userSchema),
};

module.exports = {
    getDB: () => db,
    getFields: () => userFields,
};
