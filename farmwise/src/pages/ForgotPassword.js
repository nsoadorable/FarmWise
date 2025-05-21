import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send password reset email.');
    }
  };

  return (
    <Container
      sx={{
        mt: 6,
        maxWidth: 400,
        bgcolor: '#f1f5f0',
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: 'Sitka Semibold, serif',
          color: '#341c1c',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Forgot Password
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2, fontFamily: 'Merriweather, serif' }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, fontFamily: 'Merriweather, serif' }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Enter your email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiInputBase-root': {
              fontFamily: 'Merriweather, serif',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#4b644a',
            color: '#ffffff',
            fontFamily: 'Sitka Semibold, serif',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#3a5039',
            },
          }}
        >
          Send Reset Link
        </Button>
      </Box>
    </Container>
  );
}
