const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getUser } = require('../../Controllers/User/getUser')
userRoute.get('/getUser', verifyToken, getUser);

module.exports = userRoute;