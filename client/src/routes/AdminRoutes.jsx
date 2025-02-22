import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/not_found_page/NotFoundPage'
import ManageUser from '../Admin/ManageUser/ManageUser';
import AdminHomePage from '../pages/admin_home_page/AdminHomePage';
import AdminLayout from '../layout/AdminLayout';

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="users" element={<ManageUser />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes