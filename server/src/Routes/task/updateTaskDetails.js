const express = require('express');
const taskRoute = express.Router();
const { verifyToken, verifyTokenAuthorization } = require('../../middlewares/baseToken.js');
const { updateStatus, updatePriority, updateDescription, updateTimeTracking, updateEstimate } = require('../../Controllers/Task/updateTaskDetails');


//Route for updating task status
taskRoute.put('/updateStatus', verifyToken, verifyTokenAuthorization, updateStatus);


// Route for updating task priority
taskRoute.put('/updatePriority', verifyToken, verifyTokenAuthorization, updatePriority);

// Route for updating task description
taskRoute.put('/updateDescription', verifyToken, verifyTokenAuthorization, updateDescription);

// Route for updating task time tracking
taskRoute.put('/updateTimeTracking', verifyToken, verifyTokenAuthorization, updateTimeTracking);

// Route for updating task estimate
taskRoute.put('/updateEstimate', verifyToken, verifyTokenAuthorization, updateEstimate);

module.exports = taskRoute;
