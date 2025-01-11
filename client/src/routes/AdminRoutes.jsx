import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/not_found_page/NotFoundPage'
import ManageUser from '../Admin/ManageUser/ManageUser';
import DefaultLayout from '../layout/DefaultLayout';
import AdminHomePage from '../pages/admin_home_page/AdminHomePage';

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/manage" element={<AdminHomePage />}>
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AdminRoutes