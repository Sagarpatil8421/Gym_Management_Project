import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FitnessCenter, SelfImprovement, DirectionsRun, Pool } from '@mui/icons-material';
import './LandingPage.css';

const programs = [
  {
    name: 'Strength Training',
    icon: <FitnessCenter className="program-icon" />, 
    desc: 'Build muscle and boost your metabolism with our expert-led strength classes.'
  },
  {
    name: 'Yoga & Flexibility',
    icon: <SelfImprovement className="program-icon" />, 
    desc: 'Enhance your flexibility and find your inner peace with our yoga sessions.'
  },
  {
    name: 'Cardio Blast',
    icon: <DirectionsRun className="program-icon" />, 
    desc: 'Burn calories and improve heart health with high-energy cardio workouts.'
  },
  {
    name: 'Aquatic Fitness',
    icon: <Pool className="program-icon" />, 
    desc: 'Low-impact, high-results workouts in our state-of-the-art pool.'
  }
];

export default function FeaturedPrograms() {
  return (
    <section className="programs-section">
      <h2 className="section-title">Featured Programs</h2>
      <div className="programs-grid">
        {programs.map((prog, idx) => (
          <Card className="program-card" elevation={3} key={idx}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                {prog.icon}
                <Typography variant="h6" className="program-title">{prog.name}</Typography>
                <Typography variant="body2" className="program-desc">{prog.desc}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
} 