const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.get('/', function(req, res, next) {
    try {
        logger.info('GET /');
        res.render('index', { title: 'Express' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
