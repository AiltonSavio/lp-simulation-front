import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import PoolsPage from './PoolsPage';
import LeaderboardPage from './LeaderboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pools" element={<PoolsPage />} />
        <Route path="/leaderboard/:email" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;