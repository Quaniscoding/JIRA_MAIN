const express = require('express');
const projectRoute = express.Router();
const { updateProject } = require('../../Controllers/Project/updateProject.js');
const { verifyToken, verifyTokenAuthorization } = require('../../middlewares/baseToken.js');

projectRoute.put('/updateProject/:id', verifyTokenAuthorization, verifyToken, updateProject);

module.exports = projectRoute;
