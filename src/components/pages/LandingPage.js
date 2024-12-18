import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 
import { useAuth } from '../auth/AuthContext';
import ImageSlider from './ImageSlider';
import { colors } from '@mui/material';


const LandingPage = () => {
  // Check if the user is logged in
  const { currentUser } = useAuth(); 
  const isLoggedIn = Boolean(currentUser);

  const handleContactPopup = () => {
    alert('Contact us here for detailed information and exciting offers!');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section id="home">
        <div class="hero-container">
            <h2>Welcome to<b style={{color:'#ff6b6b'}}> MY FITNESS </b></h2>
            <p>Your fitness journey starts here. Let us help you reach your goals.</p>
            {isLoggedIn ? (
              <button className="cta-btn" onClick={handleContactPopup}>
                Let’s Get Moving!
              </button>
            ):(
              <Link to="/signup" className="cta-btn">Join Us Today</Link>
            )}

        </div>
      </section>

      {/* Image Slider Section  */}
      <ImageSlider />

      {/* Features Section */}
      <div className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Digital Receipts</h3>
            <p>Never lose your receipts again! Access all payment records digitally.</p>
          </div>
          <div className="feature">
            <h3>Notifications</h3>
            <p>Receive timely notifications about your gym dues and events.</p>
          </div>
          <div className="feature">
            <h3>Admin Control</h3>
            <p>Gym owners can manage members, bills, and notifications easily.</p>
          </div>
        </div>
      </div>
      
      <section id="about">
          <div class="container">
              <h2>About Us</h2>
              <p><b style={{color:'#ff6b6b'}}>MY FITNESS</b> is dedicated to providing top-notch fitness facilities and guidance. We have modern equipment, professional trainers, and a community that will motivate you to reach your fitness potential.</p>
          </div>
      </section>
      
      <div className="call-to-action">
        <h2>Ready to join?</h2>
        {isLoggedIn ? (
          <button className="cta-btn" onClick={handleContactPopup}>
            Let’s Get Moving!
          </button>
        ):(
          <Link to="/signup" className="cta-btn">Join Us Today</Link>
        )}
      </div>
      <section id="contact">
          <div class="container">
              <h2>Contact Us</h2>
              <p>Have any questions or want to learn more? Reach out to us anytime!</p>
              <p>Email: support@gymmanage.com | Phone: +123 456 7890</p>
          </div>
      </section>
    </div>
  );
};

export default LandingPage;
