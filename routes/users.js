const express = require('express');

const userAPI = require('./api/users');

const router = express.Router();

async function checkExists(req, res, next) {
    const getId ={
        GET: req.query,
        POST: req.body,
    };
    const { id } = getId[req.method];
    res.exists = Boolean(await userAPI.count({ id }));

    next();
}

router.get('/exists', checkExists, (req, res) => {
    res.json(res.exists);
});

router.post('/signup', checkExists, async (req, res) => {
    if (res.exists) {
        res.json(false);
        return;
    }

    const createResult = await userAPI.create(req.body, {});
    res.json(createResult);
});

module.exports = router;
