const express = require('express');
const statusRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {createStatus} = require('../../Controllers/Status/createStatus.js')

statusRoute.post('/createStatus', verifyToken, createStatus);

module.exports = statusRoute;
