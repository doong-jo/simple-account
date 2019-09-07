const db = require('./schema/user_info').getDB();
const Validator = require('../services/validator');
const _ = require('../services/constants');

const bcrypt = require('bcrypt');

function validateUserInfo(user) {
    const {
        id, pwd, name, birth, sex, email, phone, favorite,
    } = user;
    const splittedBirth = birth.split('-');
    const result = (Validator.checkIdAndExists(id)
        && Validator.checkPw(pwd)
        && Validator.checkName(name)
        && Validator.checkYearOfBirth(splittedBirth[0])
        && Validator.checkMonthOfBirth(splittedBirth[1])
        && Validator.checkDateOfBirth(splittedBirth[2])
        && Validator.checkSex(sex)
        && Validator.checkEmail(email)
        && Validator.checkMobile(phone)
        && favorite.length >= 3);

    return result;
}

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

    findOne(query, options, resultCallback) {
        db.users.findOne(query, options, {})
            .exec((err, data) => {
                if (err) {
                    console.error('users-findOne', err);
                    resultCallback(false);
                } else { resultCallback(data !== null); }
            });
    },

    async insert(snapshot, options, resultCallback) {
        if (!validateUserInfo(snapshot)) {
            resultCallback(false);
            return;
        }

        snapshot.pwd = await bcrypt.hash(snapshot.pwd, _.SALT_ROUNDS);
        const snapShot = new db.users(snapshot);

        snapShot.save((err) => {
            if (err) {
                console.error('users-insert', err);
                resultCallback(false);
            } else { resultCallback(true); }
        });
    },
};
