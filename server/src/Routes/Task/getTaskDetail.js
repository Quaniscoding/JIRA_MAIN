const express = require("express");
const taskRoute = express.Router();
const getTaskDetail = require("../../Controllers/Task/getTaskDetail.js");

taskRoute.get("/getTaskDetail", getTaskDetail);

module.exports = taskRoute;
