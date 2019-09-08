const bcrypt = require('bcrypt');

const userModel = require('../../models/users');
const Validator = require('../../services/validator');
const _ = require('../../services/constants');

/**
 * 요청받은 정보를 검사하고 결과를 반환한다.
 *
 * @param {object} user 요청받은 사용자 정보
 * @returns {boolean} 유효 여부
 */
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
    /**
     * 새로운 사용자를 추가한다.
     * 요쳥받은 사용자 정보를 검사 -> 비밀번호 암호화 -> 새로운 사용자 삽입 요청
     *
     * @param {object} snapshot 요청하는 사용자 정보
     * @param {object} options 생성 옵션
     * @returns {Promise} 모델의 Promise
     */
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

    /**
     * 사용자 리스트를 반환한다.
     *
     * @param {object} query 요청 쿼리
     * @param {object} projection 추출(select) 객체
     * @param {object} options 요청 옵션
     * @returns {array} 사용자 리스트
     */
    list(query, projection, options) {
        try {
            return userModel.find(query, projection, options);
        } catch(err) {
            console.error('users -> list', e);
        }
    },

    /**
     * 하나의 사용자를 반환한다.
     *
     * @param {object} query 요청 쿼리
     * @param {object} projection 추출(select) 객체
     * @param {object} options 요청 옵션
     * @returns {object} 하나의 사용자
     */
    findOne(query, projection, options) {
        try {
            return userModel.findOne(query, projection, options);
        } catch(err) {
            console.error('users -> findOne', e);
        }
        
    },

    /**
     * 사용자 수를 반환한다.
     *
     * @param {object} query 요청 쿼리
     * @returns {number} 사용자 수
     */
    count(query) {
        try {
            return userModel.count(query);
        } catch(err) {
            console.error('users -> count', e);
        }
    },
};
