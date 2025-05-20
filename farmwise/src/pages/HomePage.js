import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/img/landing-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            bgcolor: 'rgba(245, 240, 235, 0.85)', // semi-transparent white
            textAlign: 'center',
            backdropFilter: 'blur(4px)', // optional: frosted glass effect
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Sitka Semibold' }}>
            Welcome to FarmWise
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Merriweather' }}>
            Educating and supporting agricultural communities through digital learning.
          </Typography>
          <Box mt={3}>
            <Button variant="contained" size="large" href="/resources" sx={{ mr: 2, backgroundColor: '#4b644a', color: '#fff', '&:hover': {backgroundColor: '#3e533e'} }}>
              Learn More
            </Button>
            <Button variant="outlined" size="large" href="/community" sx={{
    color: '#4b644a',
    borderColor: '#4b644a',
    '&:hover': {
      backgroundColor: '#4b644a',
      color: '#fff',
    } }}>
              Join the Community
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
