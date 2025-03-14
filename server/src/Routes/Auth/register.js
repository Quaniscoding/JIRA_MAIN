const express = require("express");
const userRoute = express.Router();

const { signUp } = require("../../Controllers/Auth/register");

userRoute.post("/signup", signUp);

module.exports = userRoute;
