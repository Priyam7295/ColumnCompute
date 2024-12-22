import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected component (App)
  return <Component />;
};

export default ProtectedRoute;
