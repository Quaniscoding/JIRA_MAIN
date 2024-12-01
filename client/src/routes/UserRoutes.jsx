/*
Routes
*/

import { Routes, Route } from "react-router-dom";
import DefaultLayout from './../layout/DefaultLayout.jsx';
// import RegisterPage from './../pages/register_page/RegisterPage';
import HomePage from '../pages/home_page/HomePage.jsx';
import NotFoundPage from '../pages/not_found_page/NotFoundPage.jsx';
import SignInSide from '../pages/sign-in-side/SignInSide.jsx';
import Dashboard from './../components/Dashboard/Dashboard.jsx';

const UserRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route element={<DefaultLayout />}>
      <Route path="/login" element={<SignInSide />} />
      <Route path="/" element={<HomePage />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoutes;
