const express = require("express"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("."));
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT;
app.listen(PORT);
require("../config/initDB")();
const rootRoute = require("../Routes");
const { tags } = require("../../docs/tags.js");
const { components } = require("../../docs/components/components.js");
//auth
const { "/api/auth/signin": signIn } = require("../../docs/Auth/signIn.js");
const { "/api/auth/signup": signUp } = require("../../docs/Auth/signUp.js");
const {
  "/api/auth/refresh-token": refreshToken,
} = require("../../docs/Auth/refreshToken.js");
//comment
const {
  "/api/getComment": getComment,
} = require("../../docs/Comment/getComment.js");
const {
  "/api/comment/createComment": createComment,
} = require("../../docs/Comment/createComment.js");
const {
  "/api/deleteComment/{taskId}/{commentId}": deleteComment,
} = require("../../docs/Comment/deleteComment.js");
const {
  "/api/updateComment/{id}": updateComment,
} = require("../../docs/Comment/updateComment.js");
//user
const { "/api/getUser": getUser } = require("../../docs/User/getUser.js");
const {
  "/api/getUserById/{id}": getUserById,
} = require("../../docs/User/getUserById.js");
const {
  "/api/searchUser": getSearchUser,
} = require("../../docs/User/getSearchUser.js");
const {
  "/api/getUser/getUserByPagination?{pageIndex}?{pageSize}?{keyword}":
    getUserByPagination,
} = require("../../docs/User/getUserByPagination.js");
const {
  "/api/createUser": createUser,
} = require("../../docs/User/createUser.js");
const {
  "/api/deleteUser/{id}": deleteUser,
} = require("../../docs/User/deleteUser.js");
const {
  "/api/updateUser/{id}": updateUser,
} = require("../../docs/User/updateUser.js");
//priority
const {
  "/api/priority/getPriority": getPriority,
} = require("../../docs/Priority/getPriority.js");
//status
const {
  "/api/status/getStatus": getStatus,
} = require("../../docs/Status/getStatus.js");
//tasktype
const {
  "/api/taskType/getTasktype": getTaskType,
} = require("../../docs/TaskType/getTasktype.js");
//projectCategory
const {
  "/api/category/getProjectCategory": getProjectCategory,
} = require("../../docs/ProjectCategory/getProjectCategory.js");
//project
const {
  "/api/project/getAllProject": getAllProject,
} = require("../../docs/Project/getAllProject.js");
const {
  "/api/project/getProjectDetail/{id}": getProjectDetail,
} = require("../../docs/Project/getProjectDetail.js");
const {
  "/api/project/createProject": createProject,
} = require("../../docs/Project/createProject.js");
const {
  "/api/project/assignUserProject": assignUserProject,
} = require("../../docs/Project/assignUserProject.js");
const {
  "/api/project/removeUserFromProject": removeUserFromProject,
} = require("../../docs/Project/removeUserFromProject.js");
const {
  "/api/project/updateProject/{id}": updateProject,
} = require("../../docs/Project/updateProject.js");
const {
  "/api/project/deleteProject/{projectId}": deleteProject,
} = require("../../docs/Project/deleteProject.js");
const { runSeed } = require("../seeds/seed.js");
//task

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "v2",
      title: "Jira",
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
      "/api/user/getUser/getUserByPagination?{pageIndex}?{pageSize}?{keyword}":
        getUserByPagination,
      "/api/user/createUser": createUser,
      "/api/user/updateUser/{id}": updateUser,
      "/api/user/deleteUser/{id}": deleteUser,
      //priority
      "/api/priority/getPriority": getPriority,
      //status
      "/api/status/getStatus": getStatus,
      //taskType
      "/api/taskType/getTasktype": getTaskType,
      //projectCategory
      "/api/category/getProjectCategory": getProjectCategory,
      //project
      "/api/project/getAllProject": getAllProject,
      "/api/project/getProjectDetail/{id}": getProjectDetail,
      "/api/project/createProject": createProject,
      "/api/project/assignUserProject": assignUserProject,
      "/api/project/removeUserFromProject": removeUserFromProject,
      "/api/project/updateProject/{id}": updateProject,
      "/api/project/deleteProject/{projectId}": deleteProject,
    },
  },
  apis: ["../routes/index.js", "../controllers/Auth/*.js"],
};
const specs = swaggerJsdoc(options);

runSeed();
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/api", rootRoute);

app.get("/", (req, res) => {
  res.send("API is running! Go to /swagger for docs.");
});
