const express = require('express');
const short = require('short-uuid');
const bcrypt = require('bcrypt');

const SessionManager = require('../services/session-manager');
const userAPI = require('./api/users');
const _ = require('../services/constants');

const router = express.Router();

function clearAuth(req, res) {
    try {
        console.log('----------clear auth----------');
        res.clearCookie(_.COOKIE_SID_NAME);
        SessionManager.invalidate(req.cookies[_.COOKIE_SID_NAME]);
        SessionManager.showStatus();
    } catch (e) {
        console.log('clearAuth error', e);
    }
}

function setAuth(res, userId) {
    console.log('----------clear auth----------');
    
    const sid = short.generate();
    res.cookie(_.COOKIE_SID_NAME, sid, {
        maxAge: _.COOKIE_AGE,
    });

    SessionManager.validate(sid, userId);
    SessionManager.showStatus();
}

function comparePwd(req, res, next) {
    const { id, pwd } = req.body;
    userAPI.getList({ id }, {}, async (result) => {
        const dbPwd = result[0].pwd;
        console.log('dbPwd', dbPwd);
        console.log('pwd', pwd);

        const isEqual = await bcrypt.compare(pwd, dbPwd);
        console.log('isEqual', isEqual);
        if( isEqual ) {
            next();
            return;
        }
        
        res.json(false);
    });
}

router.post('/login', comparePwd, (req, res) => {
    console.log('route auth/login');
    const { id } = req.body;

    userAPI.getFindOne({ id }, {}, (findResult) => {
        if (findResult) {
            console.log(`user: ${id} => login successfully`);
            setAuth(res, id);
        }

        res.json(findResult);
    });
});

router.post('/logout', (req, res) => {
    console.log('route auth/logout');
    clearAuth(req, res);
    res.json(true);
});

router.post('/passport', (req, res) => {
    const sid = req.cookies[_.COOKIE_SID_NAME];
    const result = SessionManager.isExist(sid);
    if (result) SessionManager.maintain(sid);
    console.log('passport', result);

    res.json(result);
});

module.exports = router;
