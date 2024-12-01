const express = require('express');
const priorityRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {createPriority} = require('../../Controllers/Priority/createPriority')

priorityRoute.post('/createPriority', verifyToken, createPriority);

module.exports = priorityRoute;
