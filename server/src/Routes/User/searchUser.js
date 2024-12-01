const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { searchUser } = require('../../Controllers/User/searchUser')
userRoute.get('/searchUser', verifyToken, searchUser);

module.exports = userRoute;