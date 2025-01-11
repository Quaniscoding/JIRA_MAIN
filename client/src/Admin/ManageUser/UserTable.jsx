import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { callDeleteUser } from '../../redux/reducers/users/deleteUser';
import { callGetListUser } from '../../redux/reducers/users/getUser';

function UserTable({ users, onEdit, onDelete }) {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false); // State để điều khiển hiển thị modal
    const [userIdToDelete, setUserIdToDelete] = useState(null); // State lưu ID người dùng cần xóa

    // Mở modal khi nhấn nút Delete
    const handleClickOpenDialog = (userId) => {
        setUserIdToDelete(userId); // Lưu lại ID người dùng muốn xóa
        setOpenDialog(true);
    };

    // Đóng modal
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setUserIdToDelete(null);
    };

    // Xóa người dùng
    const handleDelete = async () => {
        if (userIdToDelete) {
            const response = await dispatch(callDeleteUser(userIdToDelete));
            if (response) {
                await dispatch(callGetListUser());
            }
        }
        handleCloseDialog(); // Đóng modal sau khi xóa
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Birthday</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                                <Avatar src={user.avatar} alt={user.username} />
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.birth_day
                                    ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(user.birth_day))
                                    : ''}
                            </TableCell>

                            <TableCell>
                                <IconButton color="primary" onClick={() => onEdit(user)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleClickOpenDialog(user.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal xác nhận xóa */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UserTable;
