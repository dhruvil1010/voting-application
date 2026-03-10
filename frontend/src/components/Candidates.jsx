import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
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

        const response = await axiosInstance.get('/candidate');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates', error);
        setIsLoggedIn(false);
      }
    };

    fetchCandidates();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold my-6">Candidates</h1>
      <div className="w-full max-w-4xl">
        {candidates.map((candidate, index) => (
          <div key={index} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold">{candidate.name}</h2>
            <p className="text-gray-700">Party: {candidate.party}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
