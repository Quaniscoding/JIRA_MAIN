const express = require('express');
const taskRoute = express.Router();
const getTaskDetail = require('../../Controllers/Task/getTaskDetail.js');

taskRoute.get('/getTaskDetail/:id', getTaskDetail);

module.exports = taskRoute;
