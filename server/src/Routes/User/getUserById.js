const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getUserById } = require('../../Controllers/User/getUserById')
userRoute.get('/getUserById/:id', verifyToken, getUserById);

module.exports = userRoute;