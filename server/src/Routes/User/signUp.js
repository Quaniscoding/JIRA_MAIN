const express = require('express');
const userRoute = express.Router();

const { signUp } = require('../../Controllers/User/signUp')

userRoute.post('/signup', signUp);

module.exports = userRoute;
