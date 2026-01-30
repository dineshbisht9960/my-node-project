const express = require('express');
const router = express.Router();

const userServices = require('../services/user');
const { authMiddleware } = require('../middleware/authMiddleware');
const validator = require('../validations/userValidation');
const joiValidator = require('../middleware/joiValidator');

router.post(
  '/signUp',
  joiValidator(validator.userSignUp),
  userServices.signUp
);

router.post(
  '/login',
  joiValidator(validator.userLogin),
  userServices.login
);

router.put(
  '/updateUser',
  authMiddleware,
  joiValidator(validator.userUpdate),
  userServices.updateData
);

module.exports = router;
