const express = require("express");
const userRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken");

const { updatePassword } = require("../../Controllers/User/updatePassword");
userRoute.put("/updatePassword/:id", verifyToken, updatePassword);
module.exports = userRoute;
