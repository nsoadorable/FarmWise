import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';

export default function AdminLoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // Replace with your admin login endpoint
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', form);
      onLogin(res.data.token); // Pass token up
    } catch (err) {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom>Admin Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="username" label="Admin Username" fullWidth required sx={{ mb: 2 }}
          value={form.username} onChange={handleChange}
        />
        <TextField
          name="password" label="Password" type="password" fullWidth required sx={{ mb: 2 }}
          value={form.password} onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth>Log In</Button>
      </Box>
    </Container>
  );
}