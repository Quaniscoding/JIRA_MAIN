const express = require('express');
const priorityRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getPriority } = require('../../Controllers/Priority/getPriority')
priorityRoute.get('/getPriority', verifyToken, getPriority);

module.exports = priorityRoute;