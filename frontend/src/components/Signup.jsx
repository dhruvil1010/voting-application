import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        aadharCardNumber: '',
        role: 'voter',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [redirect, setRedirect] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!/^\d{12}$/.test(formData.aadharCardNumber)) {
            alert('Aadhar Card Number must be exactly 12 digits.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/user/signup', formData);
            alert('User registered successfully!');

            const token = response.data.token;
            const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // Token expires in 2 hours
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', expiryTime);

            setRedirect(true);
        } catch (error) {
            console.error("There was an error!", error);
            alert('User registration failed!');
        }
    };

    if (redirect) {
        return <Navigate to="/candidates" />;
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md my-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Aadhar Card Number</label>
                        <input
                            type="number"
                            name="aadharCardNumber"
                            value={formData.aadharCardNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="voter">Voter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}

export default Signup;