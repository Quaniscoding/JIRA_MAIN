const express = require('express');
const piorityRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getPiority } = require('../../Controllers/Piority/getPiority')
piorityRoute.get('/getPiority', verifyToken, getPiority);

module.exports = piorityRoute;