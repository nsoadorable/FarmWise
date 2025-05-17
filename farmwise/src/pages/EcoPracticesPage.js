// src/pages/EcoPracticesPage.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import caseStudies from '../data/caseStudies';

export default function EcoPracticesPage() {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Eco‑Friendly Farming Practices
      </Typography>

      {/* Case Study Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {caseStudies.map(({ id, title, description }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Comparative Chart */}
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={caseStudies} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="title" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="costSavings" name="Cost Savings (%)" barSize={20} />
            <Bar dataKey="yieldIncrease" name="Yield Increase (%)" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}
