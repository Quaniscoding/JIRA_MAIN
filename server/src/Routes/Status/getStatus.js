const express = require('express');
const statusRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {getStatus} = require('../../Controllers/Status/getStatus.js')

statusRoute.get('/getStatus', verifyToken, getStatus);

module.exports = statusRoute;
