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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        fullName: fullName,
        email: form.email,
        password: form.password
      });

      dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } });

      setSuccess('Account created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          required
          value={form.firstName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          required
          value={form.lastName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
          value={form.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          required
          value={form.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={form.confirmPassword}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>Register</Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Log in</Link>
        </Typography>
      </Box>
    </Container>
  );
}
