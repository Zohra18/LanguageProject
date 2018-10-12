import Passport from 'passport'
import PassportJWT from 'passport-jwt'
import { devConfigTk } from '../../config/env/development'
import User from '../resources/user/user.model'

export const configJWTStrategy = () => {
  const options = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: devConfigTk.secret,
  };
  Passport.use(
    new PassportJWT.Strategy(options, (payload, done) => {
      User.findOne({_id: payload.id}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
