import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Link as MuiLink,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const validate = () => {
  const errs = {};
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!form.firstName.trim()) errs.firstName = 'First name is required.';
  if (!form.lastName.trim()) errs.lastName = 'Last name is required.';

  if (!form.email.trim()) {
    errs.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = 'Invalid email address.';
  }

  if (!form.password) {
    errs.password = 'Password is required.';
  } else if (!passwordRegex.test(form.password)) {
    errs.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
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
    setSuccess('');
  };

  const handleSubmit = async e => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setError('');
  setSuccess('');
  setLoading(true);

  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } });
    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => navigate('/login'), 1500); // This is correctly placed
  } catch (err) {
    console.error('Registration error:', err);
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
  } finally {
    setLoading(false);
  }
};

  const isFormValid = () => Object.keys(validate()).length === 0;

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
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} role="alert">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} role="alert">
          {success}
        </Alert>
      )}

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
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
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
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
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
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />
        <TextField
            name="password"
            label="Password *"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={
                errors.password ||
                'At least 8 characters'
            }
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password *"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ mb: 2 }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading || !isFormValid()}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            bgcolor: '#4b644a',
            '&:hover': { bgcolor: '#84c461' },
            fontFamily: "'Sitka Semibold', serif",
            fontSize: '1rem',
            mb: 1,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'REGISTER'}
        </Button>
      </Box>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3, color: '#4b644a', fontFamily: "'Merriweather', serif" }}
      >
        Already have an account?{' '}
        <MuiLink
          component={Link}
          to="/login"
          underline="hover"
          sx={{ cursor: 'pointer', color: '#84c461', fontWeight: 600 }}
        >
          Log in
        </MuiLink>
      </Typography>
    </Container>
  );
}
