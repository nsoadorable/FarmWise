import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      });
      setSuccess(true);
    } catch (err) {
      setServerError(err.response?.data?.error || 'Signup failed.');
    }
  };

  if (success) {
    return (
      <Container sx={{ mt: 4, maxWidth: 400, backgroundColor: '#f5f7f3', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Alert severity="success">Account created! You can now <Link to="/login">log in</Link>.</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 6,
        p: 4,
        backgroundColor: '#f5f7f3',
        borderRadius: 2,
        boxShadow: 3,
        fontFamily: "'Merriweather', serif"
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "'Sitka Semibold', serif", color: '#4b644a', textAlign: 'center' }}
      >
        Sign Up
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 3, fontFamily: "'Merriweather', serif" }}>
          {serverError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          value={form.firstName}
          onChange={handleChange}
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          value={form.lastName}
          onChange={handleChange}
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
          required
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
          required
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          value={form.confirmPassword}
          onChange={handleChange}
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ mb: 3 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#4b644a',
            fontFamily: "'Sitka Semibold', serif",
            fontSize: '1rem',
            '&:hover': { bgcolor: '#84c461' },
            py: 1.5,
          }}
        >
          Create Account
        </Button>
      </Box>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 2, color: '#4b644a', fontFamily: "'Merriweather', serif" }}
      >
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#84c461', fontWeight: 600, textDecoration: 'none' }}>
          Log In
        </Link>
      </Typography>
    </Container>
  );
}