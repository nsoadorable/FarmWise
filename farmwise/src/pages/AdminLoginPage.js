import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Paper
} from '@mui/material';
import axios from 'axios';

export default function AdminLoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when typing
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', form);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 8,
        fontFamily: "'Merriweather', serif"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: '#f5f7f3',
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "'Sitka Semibold', serif",
            color: '#4b644a',
            textAlign: 'center',
            mb: 3
          }}
        >
          Admin Portal
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              fontFamily: "'Merriweather', serif",
              backgroundColor: '#f8d7da',
              color: '#721c24'
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            name="username"
            label="Admin Username"
            fullWidth
            required
            value={form.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{
              style: {
                fontFamily: "'Merriweather', serif"
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Merriweather', serif",
                color: '#4b644a'
              }
            }}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
            inputProps={{
              style: {
                fontFamily: "'Merriweather', serif"
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "'Merriweather', serif",
                color: '#4b644a'
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              fontFamily: "'Sitka Semibold', serif",
              fontSize: '1rem',
              bgcolor: '#4b644a',
              '&:hover': {
                bgcolor: '#3a4f39'
              },
              '&:disabled': {
                bgcolor: '#cccccc'
              }
            }}
          >
            {loading ? 'Authenticating...' : 'Log In'}
          </Button>
        </Box>
      </Paper>

      <Typography
        variant="body2"
        sx={{
          mt: 3,
          textAlign: 'center',
          color: '#4b644a',
          fontFamily: "'Merriweather', serif"
        }}
      >
        Restricted access. Unauthorized attempts are prohibited.
      </Typography>
    </Container>
  );
}