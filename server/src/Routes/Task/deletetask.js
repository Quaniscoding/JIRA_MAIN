const express = require("express");
const taskRoute = express.Router();
const deleteTask = require("../../Controllers/Task/deleteTask.js");
const { verifyToken } = require("../../middlewares/baseToken.js");

// Route to delete a task
taskRoute.delete("/deleteTask", deleteTask);

module.exports = taskRoute;
