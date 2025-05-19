import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';
import AppContext from '../context/AppContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { dispatch } = useContext(AppContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      // Save token and user in context (or localStorage)
      dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Log In</Typography>
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
        <Button type="submit" variant="contained">Log In</Button>
      </Box>
    </Container>
  );
}
