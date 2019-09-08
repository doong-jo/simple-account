const userCollection = require('./schema/user_info');

module.exports = {

    /**
     * 다수의 사용자 정보를 조회한다.
     *
     * @param {object} query 요청 쿼리
     * @param {object} projection 추출(select) 옵션
     * @param {object} options 요청 옵션
     * @returns {Promise} DB promise
     */
    find(query, projection, options) {
        return userCollection.find(query, projection, options).exec();
    },

    /**
     * 하나의 사용자 정보를 조회한다.
     *
     * @param {object} query 요청 쿼리 
     * @param {object} projection 추출(select) 옵션
     * @param {object} options 요청 옵션
     * @returns {Promise} DB promise
     */
    findOne(query, projection, options) {
        return userCollection.findOne(query, projection, options).exec();
    },

    /**
     * 새로운 사용자를 생성한다.
     *
     * @param {*} reqSnapshot 사용자 정보
     * @param {object} options 요청 옵션
     * @returns {Promise} DB promise
     */
    insert(reqSnapshot, options) {
        const snapshopt = new userCollection(reqSnapshot);
        return snapshopt.save(options);
    },

    /**
     * 사용자 수를 조회한다.
     *
     * @param {object} query 요청 쿼리
     * @returns {Promise} DB promise
     */
    count(query) {
        return userCollection.countDocuments(query).exec();
    }
};
