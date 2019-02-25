const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const News =  require( './../models/news');

router.get('/', function (req, res, next) {
    try {
        logger.info(`GET news/`);
        News.find({})
            .then((news) => {
                res.send(news);
            })
            .catch( err => {
                throw new Error('News not found');
            })

    } catch (err) {
        next(err);
    }
});

router.get('/:id', function (req, res, next) {
    try {
        logger.info(`GET news/${req.params.id}`);
        News.findById(req.params.id)
            .then((news) => {
                res.send(news);
            })
            .catch(err => {
                logger.error(`GET news/${req.params.id}: News not found`);
                throw new Error('News not found');
            })
    }
    catch (err) {
        next(err);
    }
});

router.post('/', function (req, res, next) {
    try {
        logger.info(`POST news/`);

        if (!req.isAuthenticated()) {
            throw new Error('unauthenticated user');
        }

        News.create(req.body)
            .then(() => {
                logger.info(`News added successfully`);
                res.send('OK');
            })
            .catch((err) => {
                logger.error(`News addind failed`);
                throw new Error('News adding failed');
            });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', function (req, res, next) {
    try {
        logger.info(`PUT news/${req.params.id}`);

        if (!req.isAuthenticated()) {
            throw new Error('unauthenticated user');
        }

        News.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                logger.info(`News updated successfully`);
                res.send('OK');
            })
            .catch((err) => {
                logger.error(`News updating failed`);
                throw new Error('News updating failed');
            });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', function (req, res, next) {
    try {
        logger.info(`DELETE news/${req.params.id}`);

        if (!req.isAuthenticated()) {
            throw new Error('unauthenticated user');
        }

        News.findByIdAndRemove(req.params.id)
            .then(() => {
                logger.info(`News deleted successfully`);
                res.send('OK');
            })
            .catch((err) => {
                logger.error(`News deleting failed`);
                throw new Error('News deleting failed');
            });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
