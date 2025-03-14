const express = require("express");
const taskRoute = express.Router();
const updateTask = require("../../Controllers/Task/updateTask");

// Route to update a task
taskRoute.put("/updateTask", updateTask);

module.exports = taskRoute;
