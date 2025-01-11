import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { callUpdateUser } from '../../redux/reducers/users/updateUser';

function EditUserDialog({ open, user, onClose, onUserUpdated }) {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const response = await dispatch(callUpdateUser(user.id, formData));

        const payload = {
            ...formData,
            birth_day: new Date(formData.birth_day).toISOString(),
        };
        await dispatch(callUpdateUser(user.id, payload));
        if (response) {
            onUserUpdated(formData);
        }
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField label="Username" name="username" fullWidth margin="dense" value={formData.username || ''} onChange={handleChange} />
                <TextField
                    margin="dense"
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Pass_word"
                    name="pass_word"
                    type="pass_word"
                    value={formData.pass_word}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Birth_day"
                    name="birth_day"
                    type="date"
                    value={formData.birth_day}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="moderator">Moderator</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditUserDialog;
