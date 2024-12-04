const express = require('express'),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static("."));
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT;
app.listen(PORT);
require('../config/initDB')();
const rootRoute = require('../Routes');
const { tags } = require("../../docs/tags.js");
const { components } = require('../../docs/components/components.js');
//comment
const { "/api/getComment": getComment } = require("../../docs/Comment/getComment.js");
const { "/api/comment/createComment": createComment } = require("../../docs/Comment/createComment.js");
const { "/api/deleteComment/{taskId}/{commentId}": deleteComment } = require("../../docs/Comment/deleteComment.js");
const { "/api/updateComment/{id}": updateComment } = require("../../docs/Comment/updateComment.js");
//auth
const { "/api/auth/signin": signIn } = require("../../docs/Auth/signIn.js");
const { "/api/auth/signup": signUp } = require("../../docs/Auth/signUp.js");
const { "/api/auth/refresh-token": refreshToken } = require("../../docs/Auth/refreshToken.js")
//user
const { "/api/getUser": getUser } = require("../../docs/User/getUser.js");
const { "/api/getUserById/{id}": getUserById } = require("../../docs/User/getUserById.js");
const { "/api/searchUser": getSearchUser } = require("../../docs/User/getSearchUser.js");
const { "/api/getUser/getUserByPagination?{pageIndex}?{pageSize}?{keyword}": getUserByPagination } = require("../../docs/User/getUserByPagination.js");
const { "/api/createUser": createUser } = require("../../docs/User/createUser.js");
const { "/api/deleteUser/{id}": deleteUser } = require("../../docs/User/deleteUser.js");
const { "/api/updateUser/{id}": updateUser } = require("../../docs/User/updateUser.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      "version": "v2",
      "title": "Airbnb",
    },
    tags,
    components,
    paths: {
      //auth
      "/api/auth/signin": signIn,
      "/api/auth/signup": signUp,
      "/api/auth/refresh-token": refreshToken,
      //comment
      "/api/comment/getComment/{id}": getComment,
      "/api/comment/createComment": createComment,
      "/api/comment/updateComment/{id}": updateComment,
      "/api/comment/deleteComment/{taskId}/{commentId}": deleteComment,
      //user
      "/api/user/getUser": getUser,
      "/api/user/getUserById/{id}": getUserById,
      "/api/user/searchUser": getSearchUser,
      "/api/user/getUser/getUserByPagination?{pageIndex}?{pageSize}?{keyword}": getUserByPagination,
      "/api/user/createUser": createUser,
      "/api/user/updateUser/{id}": updateUser,
      "/api/user/deleteUser/{id}": deleteUser,
    },
  },
  apis: ["../routes/index.js", "../controllers/Auth/*.js"],
};
const specs = swaggerJsdoc(options);

const theme = new SwaggerTheme();
const darkThemeCss = theme.getBuffer(SwaggerThemeNameEnum.DARK);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true, customCss: darkThemeCss }),
);
app.use("/api", rootRoute);