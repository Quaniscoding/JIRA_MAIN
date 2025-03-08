import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callCreateUser } from '../../redux/reducers/users/createUser';

function CreateUserDialog({ open, onClose, onUserAdded }) {
    const [formData, setFormData] = useState({
        username: '', first_name: '', last_name: '', email: '', password: '',
        phone: '', birth_day: '', gender: '', role: '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const resetFormData = () => {
        setFormData({
            username: '', first_name: '', last_name: '', email: '', password: '',
            phone: '', birth_day: '', gender: '', role: '',
        });
    }
    const handleSave = async () => {
        const response = await dispatch(callCreateUser(formData));
        if (response) {
            onUserAdded(response);
        }
        resetFormData();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-lg">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create New User</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="birth_day"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.birth_day}
                        onChange={handleChange}
                    />
                    <select
                        name="gender"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <select
                        name="role"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateUserDialog;
