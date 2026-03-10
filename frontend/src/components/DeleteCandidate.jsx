import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

const DeleteCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    

       

        // Fetch candidates
        const candidatesResponse = await axiosInstance.get('/candidate');
        setCandidates(candidatesResponse.data);
         // Fetch user profile to check if the user is an admin
         const userProfileResponse = await axiosInstance.get('/user/profile');
         setIsAdmin(userProfileResponse.data.user.role === 'admin');

      } catch (error) {
        console.error('Error fetching data', error);
        setIsLoggedIn(false);
      }



    };

    fetchData();
  }, []);

  const deleteCandidate = async (candidateId) => {
    try {
      const response = await axiosInstance.delete(`/candidate/${candidateId}`);
      if (response.status === 200) {
        setCandidates(candidates.filter(candidate => candidate._id !== candidateId));
        alert('Candidate deleted successfully!');
      } else {
        console.error('Failed to delete candidate');
      }
    } catch (error) {
      console.error('Error deleting candidate', error);
      alert('Failed to delete candidate. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    alert('only admin can delete candidates');
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Candidates</h1>
      <div className="w-full max-w-4xl">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{candidate.name}</h2>
                <p className="text-gray-700">Party: {candidate.party}</p>
              </div>
              <button
                onClick={() => deleteCandidate(candidate._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No candidates available</p>
        )}
      </div>
    </div>
  );
};

export default DeleteCandidate;
