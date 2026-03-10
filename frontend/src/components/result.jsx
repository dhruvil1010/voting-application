import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig'; // Adjust the import as needed

const Result = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get('/candidate/votecount'); 
        console.log(response);
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Election Results</h1>
      <div className="w-full max-w-4xl">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{candidate.name}</h2>
                <p className="text-gray-700">Party: {candidate.party}</p>
                <p className="text-gray-700">Votes: {candidate.count}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No candidates available</p>
        )}
      </div>
    </div>
  );
};

export default Result;
