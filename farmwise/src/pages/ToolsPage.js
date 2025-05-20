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
    <Container
      maxWidth="md"
      sx={{
        my: 4,
        p: 3,
        backgroundColor: '#f5f7f3',
        borderRadius: 2,
        boxShadow: 3,
        fontFamily: "'Merriweather', serif",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "'Sitka Semibold', serif", color: '#4b644a' }}
      >
        Tools & Support
      </Typography>

      {/* Carbon Footprint Calculator */}
      <Box
        component="form"
        onSubmit={handleCalc}
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexBasis: '100%', fontFamily: "'Sitka Semibold', serif", mb: 1, color: '#4b644a' }}
        >
          Carbon Footprint Calculator
        </Typography>

        <TextField
          label="Miles driven per week"
          variant="outlined"
          type="number"
          value={miles}
          onChange={e => setMiles(e.target.value)}
          required
          sx={{ width: { xs: '100%', sm: 200 } }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#4b644a',
            fontFamily: "'Sitka Semibold', serif",
            '&:hover': { bgcolor: '#84c461' },
            px: 4,
            height: '56px', // match TextField height
          }}
        >
          Calculate
        </Button>

        {co2 !== null && (
          <Alert
            severity="info"
            sx={{
              mt: 2,
              width: '100%',
              fontFamily: "'Merriweather', serif",
              backgroundColor: '#e6f0e6',
              color: '#4b644a',
              borderRadius: 1,
            }}
          >
            ≈ {co2} kg CO₂ per week
          </Alert>
        )}
      </Box>

      {/* Newsletter Signup */}
      <Box
        component="form"
        onSubmit={handleSubscribe}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexBasis: '100%', fontFamily: "'Sitka Semibold', serif", mb: 1, color: '#4b644a' }}
        >
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
              required
              sx={{ width: { xs: '100%', sm: 300 } }}
              inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#4b644a',
                fontFamily: "'Sitka Semibold', serif",
                '&:hover': { bgcolor: '#84c461' },
                px: 4,
                height: '56px',
              }}
            >
              Subscribe
            </Button>
          </>
        ) : (
          <Alert
            severity="success"
            sx={{
              fontFamily: "'Merriweather', serif",
              width: '100%',
              mt: 1,
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: 1,
            }}
          >
            Thanks for subscribing, {email}!
          </Alert>
        )}
      </Box>
    </Container>
  );
}
