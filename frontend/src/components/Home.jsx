import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Hero Section */}
      <section className="bg-indigo-800 text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Voting Platform</h1>
        <p className="text-xl mb-6">Your participation is essential. Review candidates, cast your vote, and manage your profile seamlessly.</p>
        <Link to="/vote">
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600">
            Begin Your Journey
          </button>
        </Link>
      </section>

      {/* Overview Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Candidates */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Candidates</h2>
            <p className="text-gray-800 mb-4">Discover the candidates running in the election.</p>
            <Link to="/candidates">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                View Candidates
              </button>
            </Link>
          </div>

          {/* Vote */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Vote</h2>
            <p className="text-gray-800 mb-4">Cast your vote for the preferred candidate.</p>
            <Link to="/vote">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Vote Now
              </button>
            </Link>
          </div>

          {/* Profile */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Profile</h2>
            <p className="text-gray-800 mb-4">Manage your profile details with ease.</p>
            <Link to="/profile">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                View Profile
              </button>
            </Link>
          </div>

          {/* Add Candidate */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Add Candidate</h2>
            <p className="text-gray-800 mb-4">Admins can add new candidates to the election.</p>
            <Link to="/add-candidate">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add Candidate
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Voting Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
