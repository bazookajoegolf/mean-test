const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err) {
        console.log("passport had an error");
        return done(err, false);
      }

      if(user) {
        console.log("I found a user");
        return done(null, user);
        
      } else {
          console.log("no user found");
        return done(null, false);
      }
    });
  }));
}
