import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import caseStudies from '../data/philEcoCaseStudies';

export default function EcoPracticesPage() {
  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        my: 4, 
        fontFamily: "'Merriweather', serif",
        borderRadius: 2,
        p: 3
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontFamily: "'Sitka Semibold', serif", 
          color: '#4b644a',
          mb: 3
        }}
      >
        Eco‑Friendly Farming Practices
      </Typography>

      {/* Case Studies Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {caseStudies.map(({ id, title, description, sourceUrl }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card 
              sx={{ 
                height: '100%',
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 1,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Sitka Semibold', serif", 
                    color: '#4b644a',
                    mb: 1
                  }}
                >
                  {title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#341c1c',
                    fontFamily: "'Merriweather', serif"
                  }}
                >
                  {description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button 
                  size="small" 
                  href={sourceUrl} 
                  target="_blank" 
                  rel="noopener"
                  sx={{
                    fontFamily: "'Sitka Semibold', serif",
                    color: '#4b644a',
                    '&:hover': {
                      color: '#84c461'
                    }
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart Box */}
      <Box 
        sx={{ 
          height: 320, 
          bgcolor: 'white', 
          borderRadius: 2, 
          p: 3, 
          boxShadow: 1,
          mb: 4
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: "'Sitka Semibold', serif", 
            color: '#4b644a',
            mb: 2
          }}
        >
          Practice Impact Comparison
        </Typography>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart 
            data={caseStudies} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis 
              dataKey="title" 
              tick={{ 
                fontFamily: "'Merriweather', serif",
                fontSize: 12 
              }} 
            />
            <YAxis 
              tick={{ 
                fontFamily: "'Merriweather', serif",
                fontSize: 12 
              }} 
            />
            <Tooltip 
              contentStyle={{
                fontFamily: "'Merriweather', serif",
                borderRadius: 2,
                borderColor: '#4b644a'
              }}
            />
            <Legend 
              wrapperStyle={{ 
                fontFamily: "'Merriweather', serif",
                paddingTop: '20px'
              }} 
            />
            <Bar 
              dataKey="costSavings" 
              name="Cost Savings (%)" 
              barSize={20} 
              fill="#985f46" 
            />
            <Bar 
              dataKey="yieldIncrease" 
              name="Yield Increase (%)" 
              barSize={20} 
              fill="#4b644a" 
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}