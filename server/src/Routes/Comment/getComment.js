const express = require("express");
const commentRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken");

const { getComment } = require("../../Controllers/Comment/getComment");
commentRoute.get("/getComment", verifyToken, getComment);

module.exports = commentRoute;
