const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getUserByProjectId } = require('../../Controllers/User/getUserByProjectId')
userRoute.get('/getUserByProjectId/:projectId', verifyToken, getUserByProjectId);

module.exports = userRoute;