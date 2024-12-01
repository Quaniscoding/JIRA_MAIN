const express = require('express');
const taskTypeRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {createTaskType} = require('../../Controllers/TaskType/createTaskType.js')

taskTypeRoute.post('/createTaskType', verifyToken, createTaskType);

module.exports = taskTypeRoute;
