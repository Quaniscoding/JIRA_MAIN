const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { updateUser } = require('../../Controllers/User/updateUser')
userRoute.put('/updateUser/:id', verifyToken, updateUser);

module.exports = userRoute;


