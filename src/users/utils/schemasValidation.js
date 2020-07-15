const Joi = require('@hapi/joi');

const schemas = {
  signUp: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

module.exports = schemas;
