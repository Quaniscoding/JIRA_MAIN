const express = require('express');
const projectRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');
const { getProjectByPagination } = require('../../Controllers/Project/getProjectByPagination');

projectRoute.get('/getProject/getProjectByPagination', verifyToken, getProjectByPagination);

module.exports = projectRoute;