const express = require("express");
const commentRoute = express.Router();

const { deleteComment } = require("../../Controllers/Comment/deleteComment");
commentRoute.delete("/deleteComment", deleteComment);

module.exports = commentRoute;
