const express = require("express");
const statusRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken.js");
const {
  updateSwapStatus,
} = require("../../Controllers/Status/updateSwapStatus.js");

statusRoute.put("/updateSwapStatus", verifyToken, updateSwapStatus);

module.exports = statusRoute;
