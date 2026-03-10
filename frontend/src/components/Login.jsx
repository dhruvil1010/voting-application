import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        aadharCardNumber: '',
        password: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{12}$/.test(formData.aadharCardNumber)) {
            alert('Aadhar Card Number must be exactly 12 digits.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/user/login', formData);
            alert('User logged in successfully!');

            // Store the token in local storage
            const token = response.data.token;
            const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // Token expires in 2 hours
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', expiryTime);

            setRedirect(true);
        } catch (error) {
            console.error("There was an error!", error);
            alert('Login failed!');
        }
    };

    if (redirect) {
        return <Navigate to="/candidates" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an account?</p>
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
