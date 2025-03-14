const express = require("express");
const userRoute = express.Router();

const { signIn } = require("../../Controllers/Auth/login");
userRoute.post("/signin", signIn);

module.exports = userRoute;
