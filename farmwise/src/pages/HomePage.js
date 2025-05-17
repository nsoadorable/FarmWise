import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to FarmWise
        </Typography>
        <Typography variant="h6" gutterBottom>
          Educating and supporting agricultural communities through digital learning.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" size="large" href="/resources">
            Learn More
          </Button>
          <Button variant="outlined" size="large" href="/community" sx={{ ml: 2 }}>
            Join the Community
          </Button>
        </Box>
      </Box>
    </Container>
  );
}