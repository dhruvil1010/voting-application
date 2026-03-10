import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const currentTime = new Date().getTime();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isActive = (path) => location.pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        // Redirect to login page
        window.location.href = '/login';
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold">EasyVote</Link>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8">
                        <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>Home</Link>
                        <Link to="/candidates" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/candidates')}`}>Candidates</Link>
                        <Link to="/vote" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/vote')}`}>Vote</Link>
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown} 
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                            >
                                Manage Candidates
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 rounded-md z-20 border border-gray-200">
                                    <Link to="/add-candidate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Candidate</Link>
                                    <Link to="/delete-candidate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete Candidate</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/result" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/result')}`}>Result</Link>
                        {(token && tokenExpiry && currentTime < tokenExpiry) ? (
                            <>
                                <Link to="/profile" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/profile')}`}>Profile</Link>
                                <button 
                                    onClick={logout} 
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/signup')}`}>Signup</Link>
                                <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/login')}`}>Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
