import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/not_found_page/NotFoundPage";
import AdminLayout from "../layout/AdminLayout";
import AdminPage from "../pages/AdminPage/AdminPage";
import ManageUsers from "../Features/Admin/Users/ManageUsers";
import ManageRoles from "../Features/Admin/Users/ManageRoles.jsx";
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminPage />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="roles" element={<ManageRoles />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes;
