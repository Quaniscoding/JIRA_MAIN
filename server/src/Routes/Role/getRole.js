const express = require("express");
const roleRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken.js");

const { getRole } = require("../../Controllers/Role/getRole.js");

roleRoute.get("/getRole", verifyToken, getRole);

module.exports = roleRoute;
