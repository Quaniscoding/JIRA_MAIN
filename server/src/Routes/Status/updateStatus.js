const express = require("express");
const statusRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken.js");
const { updateStatus } = require("../../Controllers/Status/updateStatus.js");

statusRoute.put("/updateStatus", verifyToken, updateStatus);

module.exports = statusRoute;
