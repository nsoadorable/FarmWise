import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#4b644a',
        color: 'white',
        py: 3,
        mt: 4,
      }}
    >
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {/* Left: Logo + Title + Admin Login */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              justifyContent: 'center',
              minHeight: 80,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                component="img"
                src="/img/FW_Logo.png"
                alt="FarmWise Logo"
                sx={{ height: 40, mr: 1, borderRadius: 2 }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Sitka Semibold, serif',
                  fontWeight: 'bold',
                  color: 'white',
                  letterSpacing: 1,
                }}
              >
                FarmWise
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/admin"
              variant="contained"
              size="medium"
              sx={{
                borderRadius: 2,
                backgroundColor: '#84c461',
                color: '#341c1c',
                fontFamily: 'Merriweather, serif',
                fontWeight: 600,
                boxShadow: 2,
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  backgroundColor: '#3e533e',
                  color: '#fff',
                },
              }}
            >
              Admin Login
            </Button>
          </Grid>

          {/* Center: Copyright */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 80,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Merriweather, serif', color: 'white' }}
            >
              © {new Date().getFullYear()} FarmWise
            </Typography>
          </Grid>

          {/* Right: Tagline */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-end' },
              justifyContent: 'center',
              minHeight: 80,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Merriweather, serif',
                fontStyle: 'italic',
                color: 'white',
              }}
            >
              Better harvests from shared knowledge
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
