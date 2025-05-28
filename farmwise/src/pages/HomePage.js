import React from 'react';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';

const ScrollPrompt = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 60,
      left: '50%',
      transform: 'translateX(-50%)',
      animation: 'bounce 2s infinite',
      '@keyframes bounce': {
        '0%, 20%, 50%, 80%, 100%': {
          transform: 'translateY(0) translateX(-50%)',
        },
        '40%': {
          transform: 'translateY(-20px) translateX(-50%)',
        },
        '60%': {
          transform: 'translateY(-10px) translateX(-50%)',
        },
      },
    }}
  >
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10L12 15L17 10"
        stroke="#4b644a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          background: `
            linear-gradient(
            to bottom, 
            rgba(245, 240, 236, 0) 0%, 
            rgba(245, 240, 236, 1) 100%
            ),
            url(/img/landing-bg.jpg)
            `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          position: 'relative', // Add this for positioning the arrow
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              bgcolor: 'rgba(245, 240, 235, 0.85)',
              textAlign: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Sitka Semibold' }}>
              Welcome to FarmWise
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Merriweather' }}>
              Educating and supporting agricultural communities through digital learning.
            </Typography>
            <Box mt={3}>
              <Button variant="contained" size="large" href="/resources" sx={{ mr: 2, backgroundColor: '#4b644a', color: '#fff', '&:hover': {backgroundColor: '#3e533e'} }}>
                Learn More
              </Button>
              <Button variant="outlined" size="large" href="/community" sx={{
                color: '#4b644a',
                borderColor: '#4b644a',
                '&:hover': {
                  backgroundColor: '#4b644a',
                  color: '#fff',
                } }}>
                Join the Community
              </Button>
            </Box>
          </Paper>
        </Container>
        <ScrollPrompt />
      </Box>

      {/* What is FarmWise Section */}
      <Box sx={{ py: 8, bgcolor: '#f5f0ec' }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                textAlign: 'center',
                fontFamily: 'Sitka Semibold',
                color: '#4b644a',
                mb: 4
              }}
            >
              What is FarmWise?
            </Typography>

            <Typography 
              variant="h6" 
              paragraph
              sx={{
                fontFamily: 'Merriweather',
                textAlign: 'center',
                fontStyle: 'italic',
                mb: 4
              }}
            >
              FarmWise is a community-driven web application designed to democratize access to sustainable farming education while 
              addressing food security and ecological resilience in the Philippines. By bridging the gap between farmers, students, 
              and other consumers, our platform empowers local communities through:
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                {
                  icon: '📊',
                  title: 'Data Analytics',
                  description: 'Statistical references for crop yields and farming techniques to help farmers and educators make informed decisions'
                },
                {
                  icon: '🌿',
                  title: 'Sustainable Practices',
                  description: 'Promoting eco-friendly farming methods to reduce environmental impact'
                },
                {
                  icon: '👥',
                  title: 'Knowledge Hub',
                  description: 'Crowdsourced best practices from farming communities across the Philippines'
                }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    height: '100%'
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mr: 2,
                        lineHeight: 1,
                        color: '#4b644a'
                      }}
                    >
                      {feature.icon}
                    </Typography>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: 'Sitka Semibold',
                          color: '#4b644a'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* SDG Connection */}
<Box sx={{ 
  mt: 6,
  p: 3,
  bgcolor: '#f0f7ed',
  borderRadius: 1,
  borderLeft: '4px solid #4b644a'
}}>
  <Typography variant="h6" sx={{ fontFamily: 'Sitka Semibold', mb: 1 }}>
    Our Goals Align With Global Sustainable Development:
  </Typography>
  <Typography variant="body1" sx={{ mb: 2 }}>
    FarmWise supports the United Nations Sustainable Development Goals by focusing on:
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}>
      <Box sx={{ 
        width: 40, 
        height: 40, 
        bgcolor: '#4b644a', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        mr: 1,
        fontFamily: 'Sitka Semibold'
      }}>
        2
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600 }}>Zero Hunger</Typography>
        <Typography variant="body2">Through improved agricultural education</Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box sx={{ 
        width: 40, 
        height: 40, 
        bgcolor: '#4b644a', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        mr: 1,
        fontFamily: 'Sitka Semibold'
      }}>
        4
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600 }}>Quality Education</Typography>
        <Typography variant="body2">By democratizing farming knowledge</Typography>
      </Box>
    </Box>
  </Box>
</Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}