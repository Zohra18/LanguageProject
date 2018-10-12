import jwt from 'jsonwebtoken'
import { devConfigTk } from '../../config/env/development'

export default {
  issue(payload, expiresIn) {
    return jwt.sign(payload, devConfigTk.secret,{
      expiresIn,
    })
  },
};
