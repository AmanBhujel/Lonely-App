const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('secret_token'),
    ExtractJwt.fromBodyField('secret_token'),
    ExtractJwt.fromAuthHeaderWithScheme('JWT')
  ]),
  secretOrKey: process.env.JWT_SECRET, // Replace with your secret key
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
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