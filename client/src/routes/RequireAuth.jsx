import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Giả sử bạn có trạng thái đăng nhập được lưu trữ trong Redux hoặc Context
// Ở đây sử dụng một biến giả `isAuthenticated` để minh họa
const RequireAuth = () => {
    const isAuthenticated = Boolean(localStorage.getItem('token')); // Kiểm tra đăng nhập

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
