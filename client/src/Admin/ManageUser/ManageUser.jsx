import React, { useEffect, useState } from 'react';
import { TableContainer, Paper, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { callGetListUser } from '../../redux/reducers/users/getUser';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog.jsx';
import EditUserDialog from './EditUserDialog.jsx';

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const response = await dispatch(callGetListUser());
            if (response && response.result) {
                setUsers(response.result);
            }
        }
        fetchData();
    }, [dispatch]);

    const handleOpenCreateDialog = () => setOpenCreateDialog(true);
    const handleCloseCreateDialog = () => setOpenCreateDialog(false);

    const handleOpenEditDialog = (user) => {
        setEditingUser(user);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => setOpenEditDialog(false);

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Management</h2>
            <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
                Create New User
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <UserTable
                    users={users}
                    onEdit={handleOpenEditDialog}
                    onDelete={(updatedUsers) => setUsers(updatedUsers)}
                />
            </TableContainer>
            <CreateUserDialog
                open={openCreateDialog}
                onClose={handleCloseCreateDialog}
                onUserAdded={(newUser) => setUsers([...users, newUser])}
            />
            <EditUserDialog
                open={openEditDialog}
                user={editingUser}
                onClose={handleCloseEditDialog}
                onUserUpdated={(updatedUser) => {
                    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
                }}
            />
        </div>
    );
}

export default ManageUser;
