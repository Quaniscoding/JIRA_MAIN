const express = require("express");
const projectRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken.js");
const {
  getProjectById,
} = require("../../Controllers/Project/getProjectById.js");

projectRoute.get("/getProjectById", verifyToken, getProjectById);

module.exports = projectRoute;
