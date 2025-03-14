const express = require("express");
const userRoute = express.Router();
const { verifyToken } = require("../../middlewares/baseToken");

const {
  updateUser,
  uploadCloud,
} = require("../../Controllers/User/updateUser");
userRoute.put(
  "/updateUser/:id",
  verifyToken,
  uploadCloud.single("avatar"),
  updateUser
);

module.exports = userRoute;
