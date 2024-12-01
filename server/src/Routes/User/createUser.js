const express = require('express');
const userRoute = express.Router();

const { createUser } = require('../../Controllers/User/createUser')

userRoute.post('/createUser', createUser);

module.exports = userRoute;
