import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';

export default function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed.');
    }
  };

  if (success) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="success">Account created! You can now log in.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="email" label="Email" type="email"
          fullWidth value={form.email} onChange={handleChange}
          required sx={{ mb: 2 }}
        />
        <TextField
          name="password" label="Password" type="password"
          fullWidth value={form.password} onChange={handleChange}
          required sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Create Account</Button>
      </Box>
    </Container>
  );
}
