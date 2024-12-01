const express = require('express');
const taskRoute = express.Router();
const { createTask } = require('../../Controllers/Task/createTask.js');
const { verifyToken, verifyTokenAuthorization, getUserInfoFromToken } = require('../../middlewares/baseToken.js');

taskRoute.post('/createTask', verifyToken, verifyTokenAuthorization, getUserInfoFromToken, createTask);

module.exports = taskRoute;
