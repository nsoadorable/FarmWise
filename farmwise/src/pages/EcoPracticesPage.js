import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import caseStudies from '../data/philEcoCaseStudies';

export default function EcoPracticesPage() {
  return (
    <Container sx={{ my: 4, backgroundColor: '#F5F0EB', borderRadius: 3, py: 4, px: 3, fontFamily: 'Merriweather, serif' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Sitka Semibold, serif', color: '#341c1c' }}>
        Eco‑Friendly Farming Practices
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {caseStudies.map(({ id, title, description, sourceUrl }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card sx={{ backgroundColor: '#ffffffcc', boxShadow: 2, borderRadius: 4, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'Sitka Semibold, serif', color: '#4b644a' }}>{title}</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#341c1c' }}>{description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" href={sourceUrl} target="_blank" rel="noopener">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ height: 320, backgroundColor: '#ffffffcc', borderRadius: 3, p: 2, boxShadow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={caseStudies} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="title" tick={{ fontSize: 12, fontFamily: 'Merriweather, serif' }} />
            <YAxis tick={{ fontSize: 12, fontFamily: 'Merriweather, serif' }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontFamily: 'Merriweather, serif', fontSize: 12 }} />
            <Bar dataKey="costSavings" name="Cost Savings (%)" barSize={20} fill="#84c461" />
            <Bar dataKey="yieldIncrease" name="Yield Increase (%)" barSize={20} fill="#b4654a" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}