import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Container component="footer" sx={{ textAlign: 'center', mt: 4, py: 2 }}>
      <Typography variant="body2">© {new Date().getFullYear()} FarmWise</Typography>
    </Container>
  );
}