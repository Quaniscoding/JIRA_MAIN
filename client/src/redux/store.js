import { configureStore } from "@reduxjs/toolkit";
import getAllProject from "./reducers/projects/getAllProject";
import getAllProjectByPagination from "./reducers/projects/getProjectByPagination";
import getProjectCategory from "./reducers/projects/getProjectCategory";
import getAllStatus from "./reducers/task/getAllStatus";
export const store = configureStore({
  reducer: {
    getAllProject,
    getAllProjectByPagination,
    getProjectCategory,
    getAllStatus,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
