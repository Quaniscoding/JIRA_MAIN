const express = require('express');
const taskRoute = express.Router();
const deleteTask = require('../../Controllers/Task/deleteTask.js');

// Route to delete a task
taskRoute.delete('/deleteTask/:id', deleteTask);

module.exports = taskRoute;
