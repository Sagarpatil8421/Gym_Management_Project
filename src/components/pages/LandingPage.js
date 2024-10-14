import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Custom CSS for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Gym Receipts Manager</h1>
        <p>Manage your gym payment receipts and notifications with ease!</p>
        <Link to="/login" className="cta-btn">Get Started</Link>
      </div>

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

      {/* Call to Action Section */}
      <div className="call-to-action">
        <h2>Ready to join?</h2>
        <Link to="/signup" className="cta-btn">Sign Up Now</Link>
      </div>
    </div>
  );
};

export default LandingPage;
