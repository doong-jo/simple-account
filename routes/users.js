const express = require('express');

const userAPI = require('./api/users');

const router = express.Router();

/**
 * 사용자의 존재유무를 반환한다.
 *
 * @param {Request} req express requset
 * @param {Response} res express response
 * @param {function} next express next
 */
async function checkExists(req, res, next) {
    const getId ={
        GET: req.query,
        POST: req.body,
    };
    const { id } = getId[req.method];
    const exists = Boolean(await userAPI.count({ id }));

    if (req.route.path === '/exists') { 
        res.json(exists);
        return;
    }
    res.exists = exists;
    next();
}

/**
 * 회원가입을 수행한다.
 *
 * @param {Request} req express requset
 * @param {Response} res express response
 * @returns
 */
async function doSignup(req, res) {
    if (res.exists) {
        res.json(false);
        return;
    }

    const createResult = await userAPI.create(req.body, {});
    res.json(createResult !== undefined);
}

// 사용자의 존재 유무를 반환
router.get('/exists', checkExists);

// 사용자의 존재 유무를 검사 -> 회원가입을 API를 호출
router.post('/signup', checkExists, doSignup);

module.exports = router;
