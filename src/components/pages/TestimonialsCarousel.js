import React from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './LandingPage.css';

const testimonials = [
  {
    name: 'Amit Sharma',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Joining MY FITNESS changed my life! The trainers are amazing and the community is so motivating.'
  },
  {
    name: 'Priya Singh',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'I love the variety of classes and the digital experience. Highly recommend to anyone!'
  },
  {
    name: 'Rahul Verma',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    quote: 'The notifications and digital receipts make everything so easy. Best gym in town!'
  },
  {
    name: 'Sneha Patel',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'The gym environment is always clean and welcoming. The reminders for classes and payments are super helpful!'
  },
  {
    name: 'Rohan Deshmukh',
    photo: 'https://randomuser.me/api/portraits/men/76.jpg',
    quote: 'Easy payment methods and instant digital receipts make managing my membership hassle-free.'
  },
  {
    name: 'Meera Nair',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    quote: 'I appreciate the timely notifications for offers and events. The trainers are very supportive.'
  },
  {
    name: 'Karan Malhotra',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    quote: 'The app is user-friendly and the admin team is always responsive. Love the new features!'
  },
  {
    name: 'Ayesha Khan',
    photo: 'https://randomuser.me/api/portraits/women/50.jpg',
    quote: 'Great community, motivating trainers, and the best digital experience for gym members.'
  }
];

const AUTO_ADVANCE = 5000;

export default function TestimonialsCarousel() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef();

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  React.useEffect(() => {
    timeoutRef.current = setTimeout(next, AUTO_ADVANCE);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="testimonials-section">
      <h2 className="section-title">What Our Members Say</h2>
      <div className="carousel-container">
        <button className="carousel-arrow" onClick={prev} aria-label="Previous testimonial">
          <ArrowBackIos />
        </button>
        <Card className="testimonial-card" elevation={4}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar src={testimonials[index].photo} alt={testimonials[index].name} className="testimonial-avatar" />
              <Typography variant="body1" className="testimonial-quote">“{testimonials[index].quote}”</Typography>
              <Typography variant="subtitle1" className="testimonial-name">- {testimonials[index].name}</Typography>
            </Box>
          </CardContent>
        </Card>
        <button className="carousel-arrow" onClick={next} aria-label="Next testimonial">
          <ArrowForwardIos />
        </button>
      </div>
    </section>
  );
} 