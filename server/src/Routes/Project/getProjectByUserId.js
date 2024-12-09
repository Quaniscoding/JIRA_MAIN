const express = require('express');
const projectRoute = express.Router();
const { getProjectByUserId } = require('../../Controllers/Project/getProjectByUserId.js');
const { verifyToken } = require('../../middlewares/baseToken.js');

projectRoute.get('/getProjectByUserId', verifyToken, getProjectByUserId);

module.exports = projectRoute;
