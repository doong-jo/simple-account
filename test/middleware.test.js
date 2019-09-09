const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userAPI = require('../routes/api/users');
const httpMocks = require('node-mocks-http');
const SessionManager = require('../services/session-manager');
const _ = require('../services/constants');

function checkPassport(req, res) {
    const sid = req.cookies[_.COOKIE_SID_NAME];
    const exists = SessionManager.isExist(sid);
    if (exists) {
        SessionManager.maintain(sid);
    }

    // res.json(exists);
    return exists;
}

async function checkExists(req, res, next) {
    const getId = {
        GET: req.query,
        POST: req.body,
    };
    const {
        id
    } = getId[req.method];
    const exists = Boolean(await userAPI.count({
        id
    }));

    // if (req.route.path === '/exists') { 
    //     res.json(exists);
    //     return;
    // }
    res.exists = exists;
    next();
}

async function login(req, res) {
    const {
        id,
        pwd
    } = req.body;
    const findOneResult = await userAPI.findOne({
        id
    }, {
        id: true,
        pwd: true
    });
    const sid = req.cookies[_.COOKIE_SID_NAME];

    if (findOneResult) {
        const dbPwd = findOneResult.pwd;
        const isCorrect = await bcrypt.compare(pwd, dbPwd);

        if (isCorrect && !SessionManager.isExist(sid)) {
            // setAuth(res, id); 
        }
        // res.json(isCorrect);
        return isCorrect;
    }
}

describe('middleware', () => {
    test('#1 existed id', async () => {
        const req = httpMocks.createRequest({
            query: {
                'id': 'josungdong',
            },
        });
        const res = httpMocks.createResponse();

        let result = await checkExists(req, res, () => {});
        result = res.exists;
        expect(result).toBeTruthy();
    });

    test('#2 not existed id', async () => {
        const req = httpMocks.createRequest({
            query: {
                'id': 'jesttestid',
            },
        });
        const res = httpMocks.createResponse();

        let result = await checkExists(req, res, () => {});
        result = res.exists;
        expect(result).toBeFalsy();
    });

    test('#3 no cookie', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        const result = checkPassport(req, res);
        expect(result).toBeFalsy();
    })

    test('#4 has cookie but no session', () => {
        const cookieSet = {};
        cookieSet[_.COOKIE_SID_NAME] = '1234';
        const req = httpMocks.createRequest({
            cookies: cookieSet,
        });
        const res = httpMocks.createResponse();

        const result = checkPassport(req, res);
        expect(result).toBeFalsy();
    });

    test('#5 has cookie and session', () => {
        SessionManager.validate('1234', 'thisisauserid');
        const cookieSet = {};
        cookieSet[_.COOKIE_SID_NAME] = '1234';
        const req = httpMocks.createRequest({
            cookies: cookieSet,
        });
        const res = httpMocks.createResponse();

        const result = checkPassport(req, res);
        expect(result).toBeTruthy();
    });

    test('#6 no exist user', async () => {
        const req = httpMocks.createRequest({
            body: {
                'id': 'boostcamp',
                'pwd': 'Boostcamp1!'
            },
        });
        const res = httpMocks.createResponse();
        const result = await login(req, res);
        expect(result).toBeTruthy();
    });
});