const express = require('express');
const authRefreshToken = express.Router();
const { refreshToken } = require('../../middlewares/baseToken');
authRefreshToken.post('/refresh-token', refreshToken);
module.exports = authRefreshToken;