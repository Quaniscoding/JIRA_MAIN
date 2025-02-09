import { configureStore } from "@reduxjs/toolkit";
import userSignUp from './reducers/auth/userSignUp'
import getAllProject from './reducers/projects/getAllProject'
import getProjectCategory from './reducers/projects/getProjectCategory'
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
    getProjectCategory,
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