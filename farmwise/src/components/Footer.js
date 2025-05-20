import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

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
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Left: Logo + Title */}
          <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: { xs: 1, sm: 0 } }}>
            <Box
              component="img"
              src="/img/FW_Logo.png"
              alt="FarmWise Logo"
              sx={{ height: 40, mr: 1 }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Sitka Semibold, serif', fontWeight: 'bold' }}
            >
              FarmWise
            </Typography>
          </Grid>

          {/* Center: Copyright */}
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center', mb: { xs: 1, sm: 0 } }}>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Merriweather, serif' }}
            >
              © {new Date().getFullYear()} FarmWise
            </Typography>
          </Grid>

          {/* Right: Tagline */}
          <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Merriweather, serif',
                fontStyle: 'italic',
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
