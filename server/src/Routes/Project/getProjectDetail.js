const express = require('express');
const projectRoute = express.Router();
const { verifyToken, verifyTokenAuthorization } = require('../../middlewares/baseToken.js');
const { getProjectDetail } = require('../../Controllers/Project/getProjectDetail.js');

projectRoute.get('/getProjectDetail/:id', verifyToken, verifyTokenAuthorization, getProjectDetail);

module.exports = projectRoute;
