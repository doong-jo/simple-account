const express = require('express');
const short = require('short-uuid');
const bcrypt = require('bcrypt');

const SessionManager = require('../services/session-manager');
const userAPI = require('./api/users');
const _ = require('../services/constants');

const router = express.Router();


/**
 * 사용자 인증정보(세션, 쿠키)를 제거한다.
 *
 * @param {Request} req express request
 * @param {Response} res express response
 */
function clearAuth(req, res) {
    res.clearCookie(_.COOKIE_SID_NAME);
    SessionManager.invalidate(req.cookies[_.COOKIE_SID_NAME]);
}

/**
 * 사용자 인증정보(세션, 쿠키)를 생성한다.
 *
 * @param {Response} res express request
 * @param {string} userId 사용자 아이디
 */
function setAuth(res, userId) {
    const sid = short.generate();
    res.cookie(_.COOKIE_SID_NAME, sid, {
        maxAge: _.COOKIE_AGE,
    });

    SessionManager.validate(sid, userId);
}

/**
 * 사용자의 인증 정보를 확인한다.
 *
 * @param {Request} req express request
 * @param {Response} res express response
 */
function checkPassport(req, res) {
    const sid = req.cookies[_.COOKIE_SID_NAME];
    const exists = SessionManager.isExist(sid);
    if (exists) {
        SessionManager.maintain(sid);
    }

    res.json(exists);
}

async function login(req, res) {
    const { id, pwd } = req.body;
    const findOneResult = await userAPI.findOne(
        { id }, 
        { id: true, pwd: true });
    const sid = req.cookies[_.COOKIE_SID_NAME];
    
    if (findOneResult) {
        const dbPwd = findOneResult.pwd;
        const isCorrect = await bcrypt.compare(pwd, dbPwd);
        
        if (isCorrect && !SessionManager.isExist(sid)) { 
            setAuth(res, id); 
        }
        res.json(isCorrect);
    }
}

// 요청한 아이디가 존재하는지 검사 -> 비밀번호 일치 검사 -> 사용자 인증정보 생성
router.post('/login', login);

// 사용자 인증정보 삭제
router.post('/logout', (req, res) => {
    clearAuth(req, res);
    res.json(true);
});

// 사용자 인증정보 확인 -> 세션 유지
router.post('/passport', checkPassport);

module.exports = router;
