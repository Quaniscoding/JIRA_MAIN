const express = require('express');
const commentRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { updateComment } = require('../../Controllers/Comment/updateComment')
commentRoute.put('/updateComment/:taskId', verifyToken, updateComment);

module.exports = commentRoute;