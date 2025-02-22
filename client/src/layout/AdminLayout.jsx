import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../components/SideBar/AdminSideBar'

export default function AdminLayout() {
    return (
        <div>
            <AdminSideBar />
            <div class="p-4 sm:ml-64">
                <Outlet />
            </div>
        </div>
    )
}
