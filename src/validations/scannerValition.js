const Joi = require('joi');
module.exports.userScannerValidation = Joi.object({
    message: Joi.string().required()
})