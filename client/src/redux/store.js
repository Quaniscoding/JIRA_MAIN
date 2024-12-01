import { configureStore } from "@reduxjs/toolkit";
import userSignUp from './reducers/auth/userSignUp'
import getUser from './reducers/users/getUser'
import getAllProject from './reducers/projects/getAllProject'
import getProjectCategory from './reducers/projects/getProjectCategory'
import getProjectDetail from './reducers/projects/getProjectDetail'
import updateProject from './reducers/projects/updateProject'
import getAllStatus from './reducers/task/getAllStatus'
import getAllPriority from './reducers/task/getAllPriority'
import getAllTaskType from './reducers/task/getAllTaskType'
import getListUserByProjectId from './reducers/users/getUserByProjectId';
import getTaskDetail from './reducers/task/getTaskDetail'
import getComments from './reducers/comments/getComments'
import getUserById from './reducers/users/getUserById'
export const store = configureStore({
  reducer: {
    userSignUp,
    getAllProject,
    getUser,
    getProjectCategory,
    getProjectDetail,
    updateProject,
    getAllStatus,
    getAllPriority,
    getAllTaskType,
    getListUserByProjectId,
    getTaskDetail,
    getComments,
    getUserById
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});