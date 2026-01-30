const express = require('express');
const routes = express.Router()
const verifyUserOtp = require('../services/otpService')
const validator = require('../validations/userValidation');
const joiValidator = require('../middleware/joiValidator');

routes.post('/verifyOtp', joiValidator(validator.verifyOtp), verifyUserOtp.verifyOtp)
module.exports = routes;