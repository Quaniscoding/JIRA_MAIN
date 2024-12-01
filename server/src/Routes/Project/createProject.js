const express = require('express');
const projectRoute = express.Router();
const { verifyToken, verifyTokenAuthorization, getUserInfoFromToken } = require('../../middlewares/baseToken.js');
const { createProject } = require('../../Controllers/Project/createProject');

// Apply middleware to extract user information from token
projectRoute.use(getUserInfoFromToken);

// Apply middleware to verify the token and its authorization
projectRoute.use(verifyToken, verifyTokenAuthorization);

// Route for creating a new project
projectRoute.post('/createProject', createProject);

module.exports = projectRoute;
