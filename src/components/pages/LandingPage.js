import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 
import { useAuth } from '../auth/AuthContext';
import GymOffers from './GymOffers';
import { FitnessCenter, Group, Event, Star } from '@mui/icons-material';
import TestimonialsCarousel from './TestimonialsCarousel';
import FeaturedPrograms from './FeaturedPrograms';

function useCountUp(end, duration = 2000) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    let raf;
    function update() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    }
    update();
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return count;
}

const LandingPage = () => {
  // Check if the user is logged in
  const { currentUser } = useAuth(); 
  const isLoggedIn = Boolean(currentUser);

  // Move useCountUp hooks here
  const members = useCountUp(500);
  const classes = useCountUp(30);
  const trainers = useCountUp(10);
  const years = useCountUp(5);

  const handleScrollToOffers = () => {
    document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section id="home">
        <div className="hero-container">
          <h2>
            Welcome to <span className="highlight">MY FITNESS</span>
          </h2>
          <p>Your fitness journey starts here. Let us help you reach your goals.</p>
          {isLoggedIn ? (
            <button className="cta-btn" onClick={handleScrollToOffers}>
              Let's Get Moving!
            </button>
          ):(
            <Link to="/signup" className="cta-btn">Join Us Today</Link>
          )}
        </div>
      </section>

      {/* Stats & Achievements Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat">
            <Group className="stat-icon" />
            <h3>{members}</h3>
            <p>Active Members</p>
          </div>
          <div className="stat">
            <Event className="stat-icon" />
            <h3>{classes}</h3>
            <p>Weekly Classes</p>
          </div>
          <div className="stat">
            <FitnessCenter className="stat-icon" />
            <h3>{trainers}</h3>
            <p>Certified Trainers</p>
          </div>
          <div className="stat">
            <Star className="stat-icon" />
            <h3>{years}</h3>
            <p>Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Featured Programs Grid */}
      <FeaturedPrograms />

      {/* Gym Offers Section */}
      <GymOffers />

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
          <div className="container">
              <h2>About Us</h2>
              <p><span className="highlight">MY FITNESS</span> is dedicated to providing top-notch fitness facilities and guidance. We have modern equipment, professional trainers, and a community that will motivate you to reach your fitness potential.</p>
          </div>
      </section>
      
      <div className="call-to-action">
        <h2>Ready to join?</h2>
        {isLoggedIn ? (
          <button className="cta-btn" onClick={handleScrollToOffers}>
            Let's Get Moving!
          </button>
        ):(
          <Link to="/signup" className="cta-btn">Join Us Today</Link>
        )}
      </div>
      <section id="contact">
          <div className="container">
              <h2>Contact Us</h2>
              <p>Have any questions or want to learn more? Reach out to us anytime!</p>
              <p>Email: support@myfitness.com | Phone: +123 456 7890</p>
          </div>
      </section>
    </div>
  );
};

export default LandingPage;
