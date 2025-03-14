const express = require("express");
const statusRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken.js");
const { deleteStatus } = require("../../Controllers/Status/deleteStatus.js");

statusRoute.delete("/deleteStatus", verifyToken, deleteStatus);

module.exports = statusRoute;
