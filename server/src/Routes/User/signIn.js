const express = require('express');
const userRoute = express.Router();

const { signIn } = require('../../Controllers/User/signIn')
userRoute.post('/signin', signIn);

module.exports = userRoute;
