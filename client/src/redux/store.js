import { configureStore } from "@reduxjs/toolkit";
import userSignUp from './reducers/auth/userSignUp'
import getAllProject from './reducers/projects/getAllProject'
import getProjectCategory from './reducers/projects/getProjectCategory'
import getAllStatus from './reducers/task/getAllStatus'
import getAllPiority from './reducers/task/getAllPiority'
import getAllTaskType from './reducers/task/getAllTaskType'
import getListUserByProjectId from './reducers/users/getUserByProjectId';
import getTaskDetail from './reducers/task/getTaskDetail'
import getComments from './reducers/comments/getComments'
import getUserById from './reducers/users/getUserById'
import  callGetListProjectByPagination  from './reducers/projects/getProjectByPagination';
export const store = configureStore({
  reducer: {
    userSignUp,
    getAllProject,
    callGetListProjectByPagination,
    getProjectCategory,
    getAllStatus,
    getAllPiority,
    getAllTaskType,
    getListUserByProjectId,
    getTaskDetail,
    getComments,
    getUserById
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});