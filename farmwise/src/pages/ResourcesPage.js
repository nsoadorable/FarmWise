import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Alert, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';

export default function RegistrationPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!form.firstName.trim()) errs.firstName = 'First name is required.';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.';

    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Invalid email address.';
    }

    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (form.password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), // normalize email
        password: form.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } });
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle different types of errors
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = 'Email already exists. Please use a different email.';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          name="firstName"
          label="First Name *"
          fullWidth
          value={form.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{ mb: 2 }}
          autoFocus
        />
        <TextField
          name="lastName"
          label="Last Name *"
          fullWidth
          value={form.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          sx={{ mb: 2 }}
        />
        <TextField
          name="email"
          label="Email *"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          label="Password *"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password || 'At least 8 characters'}
          sx={{ mb: 2 }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password *"
          type="password"
          fullWidth
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ mb: 2 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          REGISTER
        </Button>
      </Box>
      
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>
    </Container>
  );
}