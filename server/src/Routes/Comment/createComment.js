const express = require('express');
const commentRoute = express.Router();
const { verifyToken, getUserInfoFromToken } = require('../../middlewares/baseToken');

const { createComment } = require('../../Controllers/Comment/createComment');

commentRoute.post('/createComment', getUserInfoFromToken, verifyToken, createComment);

module.exports = commentRoute;
