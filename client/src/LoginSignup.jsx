import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar.jsx';
import Heading from './components/Heading.jsx';
import Body from "./components/Body.jsx";
import "./styles/LoginSignup.css" 
import Chart from "./assets/Chart.png";
import Chart2 from "./assets/grid1.jpg";
import Chart3 from "./assets/grid2.png";

const LoginSignup = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar />
      <div className="login-signup-container"> 
        <img src={Chart2} alt="Chart" className="background-image" /> 
        <div className="content-container">
        <Heading />
        <Body />
      </div>

      

    </div>
    </>
  );
};

export default LoginSignup;