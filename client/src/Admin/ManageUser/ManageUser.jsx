import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog.jsx';
import EditUserDialog from './EditUserDialog.jsx';
import { callGetUserByPagination } from '../../redux/reducers/users/getUserByPagination.js';

function ManageUser() {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();
    const listUser = useSelector(state => state.getListUser.listUser);

    useEffect(() => {
        async function fetchData() {
            const response = await dispatch(callGetUserByPagination(page, limit, keyword));
            if (response && response.result) {
                if (response.totalPages) {
                    setTotalPages(response.totalRow);
                } else {
                    setTotalPages(response.result.length < limit ? page : page + 1);
                }
            }
        }
        fetchData();
    }, [dispatch, page, limit, keyword]);

    const handleOpenCreateDialog = () => setOpenCreateDialog(true);
    const handleCloseCreateDialog = () => setOpenCreateDialog(false);

    const handleOpenEditDialog = (user) => {
        setEditingUser(user);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => setOpenEditDialog(false);

    // Xử lý phân trang
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    // Xử lý tìm kiếm: reset về trang 1 khi từ khóa thay đổi
    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        setPage(1);
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleOpenCreateDialog}
                >
                    Create New User
                </button>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleSearchChange}
                    placeholder="Search users..."
                    className="border border-gray-300 p-2 rounded w-64"
                />
            </div>
            <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                <UserTable
                    users={listUser?.result || []}
                    onEdit={handleOpenEditDialog}
                    onDelete={(updatedUsers) => {
                        // Sau khi xóa, bạn có thể re-fetch lại danh sách người dùng nếu cần.
                        // dispatch(callGetUserByPagination(page, limit, keyword));
                    }}
                />
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page <= 1}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <CreateUserDialog
                open={openCreateDialog}
                onClose={handleCloseCreateDialog}
                onUserAdded={(newUser) => {
                    // Cập nhật danh sách sau khi tạo người dùng mới nếu cần
                    // Bạn có thể trigger re-fetch hoặc cập nhật redux store.
                }}
            />
            <EditUserDialog
                open={openEditDialog}
                user={editingUser}
                onClose={handleCloseEditDialog}
                onUserUpdated={(updatedUser) => {
                    // Cập nhật danh sách sau khi chỉnh sửa người dùng nếu cần
                }}
            />
        </div>
    );
}

export default ManageUser;
