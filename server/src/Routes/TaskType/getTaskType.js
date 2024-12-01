const express = require('express');
const taskTypeRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {getTaskType} = require('../../Controllers/TaskType/getTaskType.js')

taskTypeRoute.get('/getTaskType', verifyToken, getTaskType);

module.exports = taskTypeRoute;
