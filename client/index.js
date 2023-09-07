import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Route, Routes, useNavigate,
} from 'react-router-dom';
import { Construction } from '@mui/icons-material';
import App from './App';
import LoginSignup from './components/Login-Signup';
// Appending app component to root
// add react router here
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);

const authenticate = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch('/verify')
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuthenticated);
      });
  }, []);
  return isAuth;
};

function RouterAuth() {
  const navigate = useNavigate();
  const isAuthenticated = authenticate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated]);
  if (isAuthenticated === null || isAuthenticated === false) {
    navigate('/');
  }
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/app" element={<App />} />
    </Routes>
  );
}

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <RouterAuth />
  </BrowserRouter>,
);
