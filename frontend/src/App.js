import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Admin/DashboardPage';
import PrivateRouteComponent from './components/PrivateRoute/PrivateRouteComponent';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRouteComponent element={<DashboardPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
