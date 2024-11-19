import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // NavBar styling
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase auth methods
import { auth } from '../../firebaseConfig'; // Your Firebase config

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state for mobile
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    var confirmLogout =window.confirm("Do you want to log out of your account?");
    if(confirmLogout){
      await signOut(auth);
      setMenuOpen(false); // Close the menu when logging out
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
        <img src="/img/gym-logo.png" alt="Gym Logo" className="gym-logo" style={{height:'60px'}}/>
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        {user ? (
          <>
            {/* <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li> */}
            <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li>
            <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
