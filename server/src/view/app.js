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
const PORT = process.env.PORT || 3000;
app.listen(PORT);
require('../config/initDB')();
const rootRoute = require('../Routes');
const { tags } = require("../../docs/tags.js");
const { components } = require('../../docs/components/components.js');
//comment
const { "/api/getComment": getComment } = require("../../docs/Comment/getComment.js");
const { "/api/comment/createComment": createComment } = require("../../docs/Comment/createComment.js");
const { "/api/deleteComment/{id}": deleteComment } = require("../../docs/Comment/deleteComment.js");
const { "/api/updateComment/{id}": updateComment } = require("../../docs/Comment/updateComment.js");
//user
const { "/api/user/signin": signIn } = require("../../docs/User/signIn.js");
const { "/api/user/signup": signUp } = require("../../docs/User/signUp.js");
const { "/api/getUser": getUser } = require("../../docs/User/getUser.js");
const { "/api/getUserById/{id}": getUserById } = require("../../docs/User/getUserById.js");
const { "/api/searchUser": getSearchUser } = require("../../docs/User/getSearchUser.js");
const { "/api/getUser/getUserByPagination?{pageIndex}?{pageSize}": getUserByPagination } = require("../../docs/User/getUserByPagination.js");
const { "/api/createUser": createUser } = require("../../docs/User/createUser.js");
const { "/api/deleteUser/{id}": deleteUser } = require("../../docs/User/deleteUser.js");
const { "/api/updateUser/{id}": updateUser } = require("../../docs/User/updateUser.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      "version": "v1",
      "title": "Airbnb",
    },
    tags,
    components,
    paths: {
      //comment
      "/api/comment/getComment": getComment,
      "/api/comment/createComment": createComment,
      "/api/comment/updateComment/{id}": updateComment,
      "/api/comment/deleteComment/{id}": deleteComment,
      //user
      "/api/user/signin": signIn,
      "/api/user/signup": signUp,
      "/api/user/getUser": getUser,
      "/api/user/getUserById/{id}": getUserById,
      "/api/user/searchUser": getSearchUser,
      "/api/user/getUser/getUserByPagination?{pageIndex}?{pageSize}": getUserByPagination,
      "/api/user/createUser": createUser,
      "/api/user/updateUser/{id}": updateUser,
      "/api/user/deleteUser/{id}": deleteUser,
    }
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