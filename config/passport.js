const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/User');
require('dotenv').config(); // Load environment variables

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '341cef0cb02793c112cdd9a6d4680c9dae71fcf8265c3e2c4c2232d0a346331b';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findByPk(jwt_payload.userId);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;


