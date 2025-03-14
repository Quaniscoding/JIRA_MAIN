const express = require("express");
const commentRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken");

const { createComment } = require("../../Controllers/Comment/createComment");

commentRoute.post("/createComment", verifyToken, createComment);

module.exports = commentRoute;
