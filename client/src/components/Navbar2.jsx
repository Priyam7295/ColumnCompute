import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Navbar.css';
import Dp from "../assets/dp.png"

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
// console.log(user);
  }

  return (
    <nav className="navbar">
      <div className="navContent">
        <div className="leftSection">
          {isAuthenticated && user ? (
            <>
            <div className="ProfileArea">
              
              <img src={Dp} alt="DP" />
              <span className="welcomeMessageNv2"> {user.name}</span>
            </div>
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
