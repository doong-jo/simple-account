const express = require('express');

const router = express.Router();

// const userAPI = 

router.post('/login', (req, res) => {
    // TODO: 아이디와 비밀번호 일치 확인
    console.log('route login');
    const { id, pwd } = req.body;
    console.log('login info', { id, pwd });

    res.send({ result: true });
});

router.post('/logout', (req, res) => {
    // TODO: 회원가입 API 연결
    console.log('route logout');

    res.send({ result: true });
});

router.post('/signup', (req, res) => {
    // TODO: 회원가입 API 연결
    console.log('route signup');
    console.log('data', req.body);

    res.send({ result: true });
});

module.exports = router;
