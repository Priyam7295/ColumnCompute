// src/index.js or src/main.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Your CSS file for styles
import LoginSignup from './LoginSignup.jsx';
import App from './App.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const root = createRoot(document.getElementById('root'));
const uri = import.meta.env.VITE_REACT_APP_uri;  // Redirect URI after successful login
const dom = import.meta.env.VITE_REACT_APP_DOMAIN;
const client = import.meta.env.VITE_REACT_APP_CLIENID;
root.render(
  <StrictMode>
    <Auth0Provider
      domain={dom}
      clientId={client}
      authorizationParams={{
        response_type: 'code',
      }}
      redirectUri={uri}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/upload" element={<ProtectedRoute component={App} />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
