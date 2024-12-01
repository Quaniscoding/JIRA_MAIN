const express = require('express');
const projectRoute = express.Router();
const { assignUserProject } = require('../../Controllers/Project/assignUserProject.js');
const { verifyToken, verifyTokenAuthorization } = require('../../middlewares/baseToken.js');

projectRoute.put('/assignUserProject', verifyTokenAuthorization, verifyToken, assignUserProject);

module.exports = projectRoute;
