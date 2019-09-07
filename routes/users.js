const express = require('express');

const userAPI = require('./api/users');

const router = express.Router();

function checkExists(req, res, next) {
    const { id } = req.body;
    userAPI.getFindOne({ id }, {}, (findResult) => {
        if (findResult) {
            res.json(findResult);
            return;
        }
        next();
    });
}

router.get('/exists', (req, res) => {
    console.log('route users/exist');
    const { id } = req.query;
    console.log('id', id);
    userAPI.getFindOne({ id }, {}, (result) => {
        console.log(result);
        res.json(result);
    });
});

router.post('/signup', checkExists, async (req, res) => {
    console.log('route users/signup');
    console.log('data', req.body);

    await userAPI.create(req.body, {}, (createResult) => {
        console.log('createResult', createResult);
        res.json(createResult);
    });
});

module.exports = router;
