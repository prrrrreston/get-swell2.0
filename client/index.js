import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Appending app component to root
// add react router here
const root = createRoot(document.getElementById('root'));
root.render(<App />);
