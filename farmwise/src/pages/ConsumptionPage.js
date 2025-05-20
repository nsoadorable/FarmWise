import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import seasonalData from '../data/seasonalProduce';

export default function ConsumptionPage() {
  // pledge form state
  const [pledge, setPledge] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tips = [
    'Plan meals and shop with a list to avoid impulse buys.',
    'Store fruits and veggies properly to extend freshness.',
    'Use leftovers creatively—soups, stir‑fries, and smoothies.',
    'Compost food scraps instead of throwing them away.',
    'Buy “ugly” produce at a discount to reduce waste.'
  ];

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    if (pledge.trim()) {
      setSubmitted(true);
    }
  };

const headingStyle = {
  fontFamily: 'Sitka Semibold, serif',
};

const bodyStyle = {
  fontFamily: 'Merriweather, serif',
};


  return (
    <Container sx={{ my: 4 }}>
  <Typography variant="h4" gutterBottom sx={{ ...headingStyle, color: '#341c1c' }}>
    Responsible Consumption
  </Typography>

  {/* Seasonal Produce Chart */}
  <Box sx={{ width: '100%', height: 300, mb: 4 }}>
    <Typography variant="h6" gutterBottom sx={{ ...headingStyle, color: '#4b644a' }}>
      Seasonal Produce by Month
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={seasonalData}>
        <XAxis dataKey="month" stroke="#341c1c" />
        <YAxis stroke="#341c1c" />
        <Tooltip />
        <Legend />
        <Bar dataKey="items" name="Produce Items" barSize={20} fill="#84c461" />
      </BarChart>
    </ResponsiveContainer>
  </Box>

  {/* Sustainable Eating Tips */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" gutterBottom sx={{ ...headingStyle, color: '#4b644a' }}>
      Top Tips for Reducing Food Waste
    </Typography>
    <Grid container spacing={2}>
      {tips.map((tip, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <List>
            <ListItem sx={{ bgcolor: '#ffffffcc', borderRadius: 2 }}>
              <ListItemText
                primary={tip}
                primaryTypographyProps={{ sx: { ...bodyStyle, color: '#341c1c' } }}
              />
            </ListItem>
          </List>
        </Grid>
      ))}
    </Grid>
  </Box>

  {/* Pledge Form */}
  <Box>
    <Typography variant="h6" gutterBottom sx={{ ...headingStyle, color: '#4b644a' }}>
      Take the Pledge
    </Typography>
    {!submitted ? (
      <form onSubmit={handlePledgeSubmit}>
        <TextField
          label="My pledge to reduce food waste..."
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={pledge}
          onChange={(e) => setPledge(e.target.value)}
          sx={{ mb: 2, backgroundColor: '#ffffffcc', borderRadius: 1 }}
          required
          InputProps={{
            sx: { fontFamily: 'Merriweather, serif' }
          }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#4b644a', fontFamily: 'Sitka Semibold' }}>
          Submit Pledge
        </Button>
      </form>
    ) : (
      <Typography variant="body1" sx={{ ...bodyStyle, color: '#4b644a' }}>
        Thank you for your pledge! “{pledge}”
      </Typography>
    )}
  </Box>
</Container>

  );
}
