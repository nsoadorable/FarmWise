import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: send to backend or service
    setSent(true);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        my: 4,
        fontFamily: "'Merriweather', serif",
        backgroundColor: '#f5f7f3',
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "'Sitka Semibold', serif", color: '#4b644a' }}
      >
        Contact &amp; About
      </Typography>

      <Typography paragraph sx={{ color: '#341c1c' }}>
        FarmWise is dedicated to empowering farmers and students with digital
        learning tools for sustainable agriculture. Our team of experts and
        advocates is here to help.
      </Typography>

      {!sent ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
              inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              required
              inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
            />
          </Box>
          <TextField
            label="Message"
            name="message"
            fullWidth
            multiline
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#4b644a',
              fontFamily: "'Sitka Semibold', serif",
              '&:hover': { bgcolor: '#84c461' }
            }}
          >
            Send Message
          </Button>
        </Box>
      ) : (
        <Typography
          color="success.main"
          sx={{ mt: 3, fontFamily: "'Merriweather', serif" }}
        >
          Thank you, we'll get back to you soon!
        </Typography>
      )}
    </Container>
  );
}