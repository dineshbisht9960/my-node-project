const Joi = require('joi');

module.exports.userSignUp = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty'
  }),

  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be valid'
  }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters'
  }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match'
    }),

  gender: Joi.string().valid('male', 'female', 'other').optional(),
  phone : Joi.string().required().min(10)
});

module.exports.userLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be valid'
  }),
  password: Joi.string().min(6).required()
});

module.exports.userUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
  gender: Joi.string().valid('male', 'female', 'other').allow("").optional()
});

module.exports.verifyOtp = Joi.object({
  phone: Joi.string().required().min(10),
  otp: Joi.string().required().min(4)
})