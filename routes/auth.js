const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const Users = require('./../models/users');
const passport = require('./../middlewares/passport');

router.post('/register', function (req, res, next) {
    try {
        logger.info(`POST users/`);

        Users.create(req.body)
            .then(() => {
                logger.info(`User registred successfully`);
                res.send('OK');
            })
            .catch((err) => {
                logger.error(`User registred failed`);
                throw new Error('User registred failed');
            });
    } catch (err) {
        next(err);
    }
});

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.redirect('/');
    }
);

router.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    }
);


module.exports = router;
