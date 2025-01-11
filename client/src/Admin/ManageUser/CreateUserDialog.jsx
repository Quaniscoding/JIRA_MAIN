import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { callCreateUser } from '../../redux/reducers/users/createUser';

function CreateUserDialog({ open, onClose, onUserAdded }) {
    const [formData, setFormData] = useState({
        username: '', first_name: '', last_name: '', email: '', pass_word: '',
        phone: '', birth_day: '', gender: '', role: '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const response = await dispatch(callCreateUser(formData));
        if (response) {
            onUserAdded(response);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                {/* Add TextFields for user input */}
                <TextField label="Username" name="username" fullWidth margin="dense" value={formData.username} onChange={handleChange} />
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

export default CreateUserDialog;
