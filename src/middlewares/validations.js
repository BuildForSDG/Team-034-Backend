import Joi from '@hapi/joi';

const validateRegister = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('password'),
  });
  return schema.validate(data);
}

const validations = {
  validateRegister,
};

export default validations;
