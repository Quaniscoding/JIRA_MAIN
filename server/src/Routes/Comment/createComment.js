const express = require('express');
const commentRoute = express.Router();
const { verifyToken, verifyTokenAuthorization, getUserInfoFromToken } = require('../../middlewares/baseToken');

const { createComment } = require('../../Controllers/Comment/createComment');

commentRoute.post('/createComment', getUserInfoFromToken, verifyTokenAuthorization, verifyToken, createComment);

module.exports = commentRoute;
