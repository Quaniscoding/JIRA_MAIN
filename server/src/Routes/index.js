const express = require('express');

//comment
const getComment = require('./Comment/getComment')
const postComment = require('./Comment/createComment');
const deleteComment = require('./Comment/deleteComment');
const updateComment = require('./Comment/updateComment');
//user
const signUp = require('./User/signUp');
const signIn = require('./User/signIn');
const getUser = require('./User/getUser')
const deleteUser = require('./User/deleteUser')
const getUserById = require('./User/getUserById')
const searchUser = require('./User/searchUser')
const createUser = require('./User/createUser')
const updateUser = require('./User/updateUser')
const getUserByProjectId = require('./User/getUserByProjectId');
const getUserByPagination = require('./User/getUserByPagination')
//piority
const getPiority = require('./Piority/getPiority')
const createPiority = require('./Piority/createPiority')
//projectCategory
const getProjectCategory = require('./ProjectCategory/getProjectCategory')
const createProjectCategory = require('./ProjectCategory/createProjectCategory')
//Status
const getStatus = require('./Status/getStatus')
const createStatus = require('./Status/createStatus')
//TaskType
const getTaskType = require('./TaskType/getTaskType')
const createTaskType = require('./TaskType/createTaskType')
const rootRoute = express.Router();
//Project
const createProject = require('./Project/createProject')
const getProjectDetail = require('./Project/getProjectDetail')
const getAllProject = require('./Project/getAllProject')
const deleteProject = require('./Project/deleteProject')
const updateProject = require('./Project/updateProject')
const assignUserProject = require('./Project/assignUserProject')
const removeUserFromProject = require('./Project/removeUserFromProject')
const createTask = require('./Task/createTask')
const getTaskDetail = require('./Task/getTaskDetail')
const updateTask = require('./Task/updateTask')
const deleteTask = require('./Task/deletetask')
const updateStatus = require('./task/updateTaskDetails')
const updatePiority = require('./task/updateTaskDetails')
const updateDescription = require('./task/updateTaskDetails')
const updateTimeTracking = require('./task/updateTaskDetails')
const updateEstimate = require('./task/updateTaskDetails');
//token
const refreshToken = require('./token/refreshToken');
//auth
rootRoute.use('/auth', refreshToken)
rootRoute.use('/auth', signUp)
rootRoute.use('/auth', signIn)
//comment
rootRoute.use('/comment', getComment)
rootRoute.use('/comment', postComment)
rootRoute.use('/comment', deleteComment)
rootRoute.use('/comment', updateComment)
//user
rootRoute.use('/user', getUser)
rootRoute.use('/user', deleteUser)
rootRoute.use('/user', getUserById)
rootRoute.use('/user', getUserByProjectId)
rootRoute.use('/user', searchUser)
rootRoute.use('/user', createUser)
rootRoute.use('/user', updateUser)
rootRoute.use('/user', getUserByPagination)
//piority
rootRoute.use('/piority', getPiority)
rootRoute.use('/piority', createPiority)
//projectCategory
rootRoute.use('/projectCategory', getProjectCategory)
rootRoute.use('/projectCategory', createProjectCategory)

//Status
rootRoute.use('/status', getStatus)
rootRoute.use('/status', createStatus)

//TaskType
rootRoute.use('/taskType', getTaskType)
rootRoute.use('/taskType', createTaskType)

//Project
rootRoute.use('/project', createProject);
rootRoute.use('/project', getProjectDetail);
rootRoute.use('/project', getAllProject);
rootRoute.use('/project', deleteProject);
rootRoute.use('/project', updateProject);
rootRoute.use('/project', assignUserProject);
rootRoute.use('/project', removeUserFromProject);
rootRoute.use('/project', createTask);
rootRoute.use('/project', getTaskDetail);
rootRoute.use('/project', updateTask);
rootRoute.use('/project', deleteTask);

rootRoute.use('/project', updateStatus);
rootRoute.use('/project', updatePiority);
rootRoute.use('/project', updateDescription);
rootRoute.use('/project', updateTimeTracking);
rootRoute.use('/project', updateEstimate);
module.exports = rootRoute;