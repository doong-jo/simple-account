const mongoose = require('mongoose');
const mongooseSchema = require('mongoose').Schema;

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
