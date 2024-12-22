import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Navbar.css';

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate(); 
  function handleGetStarted(){

    if(user){
      navigate("/upload");
    }
    else{
      navigate('/'); 
    }

  }

  return (
    <nav className="navbar">
      <div className="navContent">
        <div className="leftSection">
          {isAuthenticated && user ? (
            <>
              <span className="welcomeMessage">Welcome {user.name}!</span>
            </>
          ) :<span className='Logintogetstaterd'>Login to get started!</span>  }
        </div>
        <div className="authSection">
          {!isAuthenticated ? (
            <button 
              onClick={() => loginWithRedirect()} 
              className="loginButton"
            >
              Login
            </button>
          ) : (
            <div className="loggedInSection">
              <button onClick={handleGetStarted} className="getStartedButton">
                Get Started
              </button>
              <button 
                onClick={() => logout({ returnTo: window.location.origin })} 
                className="logoutButton"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
