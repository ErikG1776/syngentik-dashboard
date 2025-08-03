import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrustDashboard from './TrustDashboard';
import Home from './Home';
import './home.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TrustDashboard />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);