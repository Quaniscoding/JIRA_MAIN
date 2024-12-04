const express = require('express');
const piorityRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {createPiority} = require('../../Controllers/Piority/createPiority.js')

piorityRoute.post('/createPiority', verifyToken, createPiority);

module.exports = piorityRoute;
