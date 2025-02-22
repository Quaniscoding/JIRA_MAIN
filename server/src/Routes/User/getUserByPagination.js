const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getUserByPagination } = require('../../Controllers/User/getUserByPagination')
userRoute.get('/pagination', verifyToken, getUserByPagination);

module.exports = userRoute;