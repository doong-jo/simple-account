const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');
const redis = require('redis');
const mime = require('mime-types');

const router = express.Router();

const _ = require('../services/constants');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('connect', function () {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

function sourceCache(req, res, next) {
    const {
        url
    } = req;
    const staticDir = path.join(__dirname, '../client');
    const filePath = url === '/' ? `${staticDir}/index.html` : `${staticDir}${url}`;
    const extension = url.split('.')[1];

    function readFileHandler(err, readFileData) {
        redisClient.set(filePath, readFileData, 'EX', _.REDIS_EXPIRE,
            (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(`redis ${filePath} save`);
            });
    }

    function redisGetHandler(err, redisData) {
        if (err || !redisData) {
            fs.readFile(filePath, 'utf8', readFileHandler);
            next();
        } else {
            console.log(`redis get ${filePath}`);
            res.send(redisData);
        }
    }

    res.header("Content-Type", mime.lookup(extension));
    redisClient.get(filePath, redisGetHandler);
}

// redis 성능 테스트 함수
function photoCache(req, res, next) {
    const photosRedisKey = 'photos';

    redisClient.get(photosRedisKey, (err, photos) => {
        if (photos) {
            res.json({
                source: 'cache',
                data: JSON.parse(photos)
            });
        } else {
            // test api 
            fetch('https://jsonplaceholder.typicode.com/photos')
                .then(response => response.json())
                .then(photos => {
                    redisClient.set(photosRedisKey, JSON.stringify(photos), 'EX', _.REDIS_EXPIRE);
                    res.json({
                        source: 'api',
                        data: photos
                    });
                })
                .catch(error => {
                    console.log(error)
                    res.json(error.toString());
                });
        }
    });
}

// 정적 파일만 redis에 저장 후 캐싱
router.get(/(^[a-zA-Z0-9-_/]+)+([.])+([a-z0-9]+$)/g, sourceCache);

// redis 성능 테스트 라우팅
router.get('/photo', photoCache);

module.exports = router;