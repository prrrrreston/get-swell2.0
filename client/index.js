import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginSignup from './components/Login-Signup';
// Appending app component to root
// add react router here
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
