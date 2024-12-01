const express = require('express');
const projectRoute = express.Router();
const { removeUserFromProject } = require('../../Controllers/Project/removeUserFromProject');
const { verifyToken, verifyTokenAuthorization, getUserInfoFromToken } = require('../../middlewares/baseToken.js');

projectRoute.use(getUserInfoFromToken);
projectRoute.post('/removeUserFromProject', verifyToken, verifyTokenAuthorization, removeUserFromProject);

module.exports = projectRoute;
