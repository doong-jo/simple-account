const bcrypt = require('bcrypt');

const userModel = require('../../models/users');
const Validator = require('../../services/validator');
const _ = require('../../services/constants');

function validateUserInfo(user) {
    const FAV_LENGTH = 3;

    const {
        id, pwd, name, birth, sex, email, phone, favorite,
    } = user;
    const splittedBirth = birth.split('-');
    const result = (Validator.checkId(id)
        && Validator.checkPw(pwd)
        && Validator.checkName(name)
        && Validator.checkYearOfBirth(splittedBirth[0])
        && Validator.checkMonthOfBirth(splittedBirth[1])
        && Validator.checkDateOfBirth(splittedBirth[2])
        && Validator.checkSex(sex)
        && Validator.checkEmail(email)
        && Validator.checkMobile(phone)
        && favorite.length >= FAV_LENGTH);

    return result;
}

module.exports = {
    async create(snapshot, options) {
        try {
            if (!validateUserInfo(snapshot)) {
                return false;
            }

            snapshot.pwd = await bcrypt.hash(snapshot.pwd, _.SALT_ROUNDS);
            return userModel.insert(snapshot, options);
        } catch(err) {
            console.error('users -> create', e);
        }
        
    },

    list(query, projection, options) {
        try {
            return userModel.find(query, projection, options);
        } catch(err) {
            console.error('users -> list', e);
        }
    },

    findOne(query, projection, options) {
        try {
            return userModel.findOne(query, projection, options);
        } catch(err) {
            console.error('users -> findOne', e);
        }
        
    },

    count(query) {
        try {
            return userModel.count(query);
        } catch(err) {
            console.error('users -> count', e);
        }
    },
};
