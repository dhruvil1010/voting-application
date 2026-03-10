import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

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

        // Fetch user profile to check voting status
        const userProfileResponse = await axiosInstance.get('/user/profile');
        setIsVoted(userProfileResponse.data.user.isVoted);

        // Fetch candidates
        const candidatesResponse = await axiosInstance.get('/candidate');
        setCandidates(candidatesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  const handleVote = async (candidateId) => {
    try {
      if (isVoted) {
        alert('Voting already done!');
        window.location.href = '/';
        return;
      }

      const response = await axiosInstance.get(`/candidate/vote/${candidateId}`);
      if (response.status === 200) {
        alert('Vote successful!');
        window.location.href = '/'; // Redirect to home page
      }
    } catch (error) {
      console.error('Error voting', error);
      alert('Failed to vote. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Vote for Candidates</h1>
      <div className="w-full max-w-4xl">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{candidate.name}</h2>
                <p className="text-gray-700">Party: {candidate.party}</p>
              </div>
              <button
                onClick={() => handleVote(candidate._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Vote
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

export default Vote;
