import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

const AddCandidate = () => {
  const [role, setRole] = useState(null);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const currentTime = new Date().getTime();
        if (!token) {
          navigate('/login');
          return;
        }
        if (tokenExpiry && currentTime > tokenExpiry) {
          navigate('/login');
          return;
        }

        const response = await axiosInstance.get('/user/profile');
        const userRole = response.data.user.role;

        if (userRole !== 'admin') {
          alert('Only admin can add candidates');
          navigate('/candidates');
        } else {
          setRole(userRole);
        }
      } catch (error) {
        console.error('Error checking user role', error);
        navigate('/login');
      }
    };

    checkUserRole();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/candidate', {
        name,
        party,
        age,
      });
      if (response.status === 200) {
        alert('Candidate added successfully!');
        navigate('/candidates');
      }
    } catch (error) {
      console.error('Error adding candidate', error);
      alert('Failed to add candidate. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Candidate</h1>
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="party" className="block text-sm font-medium text-gray-700">Party</label>
            <input
              type="text"
              id="party"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
