import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const currentTime = new Date().getTime();
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        if (tokenExpiry && currentTime > tokenExpiry) {
          setIsLoggedIn(false);
          return;
        }

        const response = await axiosInstance.get('/user/profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Name</h2>
            <p className="text-gray-700">{user.name}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Age</h2>
            <p className="text-gray-700">{user.age}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Address</h2>
            <p className="text-gray-700">{user.address}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Aadhar Card Number</h2>
            <p className="text-gray-700">{user.aadharCardNumber}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Role</h2>
            <p className="text-gray-700">{user.role}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Has Voted</h2>
            <p className="text-gray-700">{user.isVoted ? 'Yes' : 'No'}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
