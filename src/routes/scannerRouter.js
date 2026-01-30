const express = require('express');
const routes = express.Router()
const scanner = require('../services/scanner');
routes.post('/generate', scanner.generateQR);

routes.get('/data/:qrId', scanner.scanQR)

module.exports = routes
