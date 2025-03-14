const express = require("express");
const rootRoute = express.Router();

//comment
const getComment = require("./Comment/getComment");
const createComment = require("./Comment/createComment");
const deleteComment = require("./Comment/deleteComment");
const updateComment = require("./Comment/updateComment");
//user
const login = require("./Auth/login");
const register = require("./Auth/register");
const getUser = require("./User/getUser");
const deleteUser = require("./User/deleteUser");
const getUserById = require("./User/getUserById");
const searchUser = require("./User/searchUser");
const createUser = require("./User/createUser");
const updateUser = require("./User/updateUser");
const updatePassword = require("./User/updatePassword");
const getUserByProjectId = require("./User/getUserByProjectId");
const getUserByPagination = require("./User/getUserByPagination");
//priority
const getPriority = require("./Priority/getPriority");
const createPriority = require("./Priority/createPriority");
//projectCategory
const getProjectCategory = require("./ProjectCategory/getProjectCategory");
const createProjectCategory = require("./ProjectCategory/createProjectCategory");
//Status
const getStatus = require("./Status/getStatus");
const createStatus = require("./Status/createStatus");
const updateStatus = require("./Status/updateStatus");
const deleteStatus = require("./Status/deleteStatus");
const updateSwapStatus = require("./Status/updateSwapStatus");
//TaskType
const getTaskType = require("./TaskType/getTaskType");
const createTaskType = require("./TaskType/createTaskType");
//Project
const createProject = require("./Project/createProject");
const getAllProject = require("./Project/getAllProject");
const getProjectById = require("./Project/getProjectById");
const deleteProject = require("./Project/deleteProject");
const updateProject = require("./Project/updateProject");
const createTask = require("./Task/createTask");
const getTaskDetail = require("./Task/getTaskDetail");
const updateTask = require("./Task/updateTask");
const deleteTask = require("./Task/deleteTask");
const getProjectByPagination = require("./Project/getProjectByPagination");
//Role
const createRole = require("./Role/createRole");
const getRole = require("./Role/getRole");
const updateRole = require("./Role/updateRole");
const deleteRole = require("./Role/deleteRole");
//token
const refreshToken = require("./token/refreshToken");
//auth
rootRoute.use("/auth", refreshToken);
rootRoute.use("/auth", login);
rootRoute.use("/auth", register);
//comment
rootRoute.use("/comment", getComment);
rootRoute.use("/comment", createComment);
rootRoute.use("/comment", deleteComment);
rootRoute.use("/comment", updateComment);
//user
rootRoute.use("/user", getUser);
rootRoute.use("/user", deleteUser);
rootRoute.use("/user", getUserById);
rootRoute.use("/user", getUserByProjectId);
rootRoute.use("/user", searchUser);
rootRoute.use("/user", createUser);
rootRoute.use("/user", updateUser);
rootRoute.use("/user", getUserByPagination);
rootRoute.use("/user", updatePassword);
//priority
rootRoute.use("/priority", getPriority);
rootRoute.use("/priority", createPriority);
//projectCategory
rootRoute.use("/category", getProjectCategory);
rootRoute.use("/category", createProjectCategory);

//Status
rootRoute.use("/status", getStatus);
rootRoute.use("/status", createStatus);
rootRoute.use("/status", updateStatus);
rootRoute.use("/status", deleteStatus);
rootRoute.use("/status", updateSwapStatus);

//TaskType
rootRoute.use("/taskType", getTaskType);
rootRoute.use("/taskType", createTaskType);

//Project
rootRoute.use("/project", createProject);
rootRoute.use("/project", getAllProject);
rootRoute.use("/project", getProjectById);
rootRoute.use("/project", deleteProject);
rootRoute.use("/project", updateProject);
rootRoute.use("/project", getProjectByPagination);
rootRoute.use("/task", createTask);
rootRoute.use("/task", getTaskDetail);
rootRoute.use("/task", updateTask);
rootRoute.use("/task", deleteTask);

//Role
rootRoute.use("/role", createRole);
rootRoute.use("/role", getRole);
rootRoute.use("/role", updateRole);
rootRoute.use("/role", deleteRole);
module.exports = rootRoute;
