import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callDeleteUser } from '../../redux/reducers/users/deleteUser';
import { callGetListUser } from '../../redux/reducers/users/getUser';

function UserTable({ users, onEdit, keyword }) {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const handleClickOpenDialog = (userId) => {
        setUserIdToDelete(userId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setUserIdToDelete(null);
    };

    const handleDelete = async () => {
        if (userIdToDelete) {
            const response = await dispatch(callDeleteUser(userIdToDelete));
            if (response) {
                const rs = await dispatch(callGetUserByPagination(1, 10, keyword, 'id', 'asc'));
                console.log(rs);
            }
        }
        handleCloseDialog();
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">Id</th>
                        <th className="py-2 px-4 text-left">Avatar</th>
                        <th className="py-2 px-4 text-left">Username</th>
                        <th className="py-2 px-4 text-left">First Name</th>
                        <th className="py-2 px-4 text-left">Last Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Birthday</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">
                                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="py-2 px-4">{user.username}</td>
                            <td className="py-2 px-4">{user.first_name}</td>
                            <td className="py-2 px-4">{user.last_name}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">
                                {user.birth_day ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(user.birth_day)) : ''}
                            </td>
                            <td className="py-2 px-4 flex space-x-2">
                                <button onClick={() => onEdit(user)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                    Edit
                                </button>
                                <button onClick={() => handleClickOpenDialog(user.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-lg" onClick={handleCloseDialog}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={handleCloseDialog} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserTable;
