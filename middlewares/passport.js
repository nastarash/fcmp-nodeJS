const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');

passport.use(new LocalStrategy(
    function (username, password, done) {
        Users.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validatePassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;