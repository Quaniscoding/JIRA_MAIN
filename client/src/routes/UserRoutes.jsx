/*
Routes
*/

import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./../layout/DefaultLayout.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import NotFoundPage from "../pages/not_found_page/NotFoundPage.jsx";
// import SignInSide from '../pages/sign-in-side/SignInSide.jsx';
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
// import SignUpSide from "../pages/sign-up-side/SignUpSide.jsx";
import Login from "../pages/Login/Login.jsx";
import SignUp from "../pages/Register/Register.jsx";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails.jsx";
import Profile from "../pages/Profile/Profile.jsx";
const UserRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<HomePage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="project/details/:id" element={<ProjectDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoutes;
