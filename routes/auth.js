const express = require('express');
const short = require('short-uuid');
const bcrypt = require('bcrypt');

const SessionManager = require('../services/session-manager');
const userAPI = require('./api/users');
const _ = require('../services/constants');

const router = express.Router();

function clearAuth(req, res) {
    res.clearCookie(_.COOKIE_SID_NAME);
    SessionManager.invalidate(req.cookies[_.COOKIE_SID_NAME]);
}

function setAuth(res, userId) {
    const sid = short.generate();
    res.cookie(_.COOKIE_SID_NAME, sid, {
        maxAge: _.COOKIE_AGE,
    });

    SessionManager.validate(sid, userId);
}

router.post('/login', async (req, res) => {
    const { id, pwd } = req.body;
    const findOneResult = await userAPI.findOne({ id }, 
        { id: true, pwd: true });
    const sid = req.cookies[_.COOKIE_SID_NAME];

    function passUser(equal) {
        if (equal && !SessionManager.isExist(sid)) { 
            setAuth(res, id); 
        }
        res.json(equal);
    }

    if (findOneResult) {
        const dbPwd = findOneResult.pwd;
        const isEqual = await bcrypt.compare(pwd, dbPwd);
        passUser(isEqual);
    }
});

router.post('/logout', (req, res) => {
    clearAuth(req, res);
    res.json(true);
});

router.post('/passport', (req, res) => {
    const sid = req.cookies[_.COOKIE_SID_NAME];
    const exists = SessionManager.isExist(sid);
    if (exists) {
        SessionManager.maintain(sid);
    }

    res.json(exists);
});

module.exports = router;
