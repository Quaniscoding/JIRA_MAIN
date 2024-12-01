const express = require('express');
const projectRoute = express.Router();
const { getAllProject } = require('../../Controllers/Project/getAllProject.js');
const { verifyToken } = require('../../middlewares/baseToken.js');

projectRoute.get('/getAllProject', verifyToken, getAllProject);

module.exports = projectRoute;
