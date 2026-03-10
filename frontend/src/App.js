import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Candidates from './components/Candidates';
import Profile from './components/Profile';
import Vote from './components/Vote';
import AddCandidate from './components/AddCandidate';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DeleteCandidate from './components/DeleteCandidate';
import Result from './components/result';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/delete-candidate" element={<DeleteCandidate />} />
          <Route path="/result" element={<Result />} />
        
          
    
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
