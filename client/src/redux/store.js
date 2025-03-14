import { configureStore } from "@reduxjs/toolkit";
import getAllProject from "./reducers/projects/getAllProject";
import getAllProjectByPagination from "./reducers/projects/getProjectByPagination";
import getProjectCategory from "./reducers/projects/getProjectCategory";
import getAllStatus from "./reducers/task/getAllStatus";
import getListUserByProjectId from "./reducers/users/getUserByProjectId";
import getListUser from "./reducers/users/getUserByPagination";
export const store = configureStore({
  reducer: {
    getAllProject,
    getAllProjectByPagination,
    getProjectCategory,
    getAllStatus,
    getListUserByProjectId,
    getListUser,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
