import Joi from 'joi'
import bcrypt from 'bcryptjs'

export default {
  encryptPassword(saltyText){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(saltyText, salt);
  },

  comparePassword(saltyText, encryptatedPassword){
    return bcrypt.compareSync(saltyText, encryptatedPassword )
  },

  validateSignup(body) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
          .email()
          .required(),
      password: Joi.string().required(),
      hierarchy: Joi.number().integer(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value }
  },

  validateLogin(body){
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error }
    }
    return { value };
  },
};
