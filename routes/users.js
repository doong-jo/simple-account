const express = require('express');
const short = require('short-uuid');

const SessionManager = require('../services/session-manager');
const userAPI = require('./api/users');

const router = express.Router();

router.get('/list', (req, res) => {
    console.log('route users/list');
    userAPI.getList(req.body, {}, (result) => {
        console.log(result);
        res.json(result);
    });
});

router.post('/login', (req, res) => {
    console.log('route users/login');
    const { id, pwd } = req.body;
    console.log('login info', { id, pwd });

    userAPI.getFindOne({ id, pwd }, {}, (findResult) => {
        if (findResult) {
            console.log(`user: ${id} => login successfully`);
            const sid = short.generate();
            res.cookie('sid', sid, {
                maxAge: 24 * 3600000, // 24 hours
            });

            SessionManager.validate(sid, id);
            SessionManager.showStatus();

            res.json(true);
            return;
        }

        res.json(false);
    });
});

router.post('/logout', (req, res) => {
    console.log('route users/logout');
    SessionManager.invalidate(req.cookies.sid);
    SessionManager.showStatus();
    res.clearCookie('sid');

    res.send({ result: true });
});

router.post('/signup', (req, res) => {
    console.log('route users/signup');
    console.log('data', req.body);

    const { id, email } = req.body;
    userAPI.getFindOne({ id, email }, {}, (findResult) => {
        if (findResult) {
            res.json(false);
            return;
        }

        userAPI.create(req.body, {}, (createResult) => {
            res.json(createResult);
        });
    });
});

module.exports = router;
