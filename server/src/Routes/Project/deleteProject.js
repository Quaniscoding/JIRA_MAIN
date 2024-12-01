const express = require('express');
const projectRoute = express.Router();
const { deleteProject } = require('../../Controllers/Project/deleteProject.js');
const { verifyToken, verifyTokenAuthorization } = require('../../middlewares/baseToken.js');

projectRoute.delete('/deleteProject/:id', verifyTokenAuthorization, verifyToken, deleteProject);

module.exports = projectRoute;
