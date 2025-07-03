import React from 'react';
import './GymOffers.css';

const offers = [
  {
    duration: '3 Months',
    regular_price: 5000,
    offer_price: 4000,
    image: '/img/offer-images/3_months_plan.jpeg',
    title: 'Just Getting Started?',
    description_part1: 'Try 90 days of transformation at just ₹44/day — ',
    description_bold: 'and save ₹1000 instantly!',
    description_part2: ''
  },
  {
    duration: '6 Months',
    regular_price: 9000,
    offer_price: 7000,
    image: '/img/offer-images/6_months_plan.jpeg',
    title: 'Ready to Level Up?',
    description_part1: 'Commit for 6 months, ',
    description_bold: 'save ₹2000,',
    description_part2: ' and feel the difference in every rep.'
  },
  {
    duration: '1 Year',
    regular_price: 18000,
    offer_price: 13000,
    image: '/img/offer-images/1_year_plan.jpeg',
    title: 'Go All In & Save Big!',
    description_part1: '1 full year of unlimited access ',
    description_bold: '+ ₹5000 savings',
    description_part2: ' — built for serious lifters.'
  },
];

const GymOffers = () => (
  <section id="offers" className="gym-offers-section">
    <h2 className="offers-title">Membership Offers</h2>
    <div className="offers-container">
      {offers.map((offer, idx) => (
        <div className="offer-box" key={idx}>
          <img src={offer.image} alt={`${offer.duration} Plan`} className="offer-image" />
          <div className="offer-content">
            <h3 className="offer-duration">{offer.duration}</h3>
            <h4 className="offer-catchphrase">{offer.title}</h4>
            <p className="offer-description">
              {offer.description_part1}
              <strong>{offer.description_bold}</strong>
              {offer.description_part2}
            </p>
            <div className="offer-prices">
              <span className="regular-price">₹{offer.regular_price}</span>
              <span className="offer-price">₹{offer.offer_price}</span>
            </div>
            {/* <div className="offer-highlight">{offer.highlight}</div> */}
            <button className="offer-btn">Grab Offer</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default GymOffers; 