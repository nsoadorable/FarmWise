import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
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
      dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 6,
        p: 4,
        backgroundColor: '#f5f7f3',
        borderRadius: 2,
        boxShadow: 3,
        fontFamily: "'Merriweather', serif",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "'Sitka Semibold', serif", color: '#4b644a', textAlign: 'center' }}
      >
        Log In
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, fontFamily: "'Merriweather', serif" }}
          role="alert"
        >
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
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
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />

        <Typography
          variant="body2"
          sx={{ mb: 3, textAlign: 'center', color: '#4b644a', fontFamily: "'Merriweather', serif" }}
        >
          <MuiLink
            component={Link}
            to="/forgot-password"
            underline="hover"
            sx={{ cursor: 'pointer', fontWeight: 500, color: '#84c461' }}
          >
            Forgot Password?
          </MuiLink>
        </Typography>

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
            mb: 2,
          }}
        >
          Log In
        </Button>
      </Box>

      <Typography
        variant="body2"
        align="center"
        sx={{ color: '#4b644a', fontFamily: "'Merriweather', serif" }}
      >
        Don’t have an account yet?{' '}
        <MuiLink
          component={Link}
          to="/register"
          underline="hover"
          sx={{ cursor: 'pointer', color: '#84c461', fontWeight: 600 }}
        >
          Register
        </MuiLink>
      </Typography>
    </Container>
  );
}
