// src/pages/ToolsPage.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';

export default function ToolsPage() {
  // Carbon calculator state
  const [miles, setMiles] = useState('');
  const [co2, setCo2] = useState(null);

  const handleCalc = e => {
    e.preventDefault();
    // Avg. ~404 grams CO2 per mile driven
    const grams = parseFloat(miles) * 404;
    setCo2((grams / 1000).toFixed(2)); // convert to kg
  };

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tools & Support
      </Typography>

      {/* Carbon Footprint */}
      <Box component="form" onSubmit={handleCalc} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Carbon Footprint Calculator
        </Typography>
        <TextField
          label="Miles driven per week"
          variant="outlined"
          type="number"
          value={miles}
          onChange={e => setMiles(e.target.value)}
          sx={{ mr: 2, width: '200px' }}
          required
        />
        <Button type="submit" variant="contained">
          Calculate
        </Button>
        {co2 !== null && (
          <Alert severity="info" sx={{ mt: 2 }}>
            ≈ {co2} kg CO₂ per week
          </Alert>
        )}
      </Box>

      {/* Newsletter Signup */}
      <Box component="form" onSubmit={handleSubscribe}>
        <Typography variant="h6" gutterBottom>
          Join our Newsletter
        </Typography>
        {!subscribed ? (
          <>
            <TextField
              label="Your Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{ mr: 2, width: '300px' }}
              required
            />
            <Button type="submit" variant="contained">
              Subscribe
            </Button>
          </>
        ) : (
          <Alert severity="success">
            Thanks for subscribing, {email}!
          </Alert>
        )}
      </Box>
    </Container>
  );
}
