// src/pages/ConsumptionPage.js
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

// Styles
const headingStyle = {
  fontFamily: 'Sitka Text, serif',
  color: '#1d2c12',
  fontWeight: 600,
  marginBottom: '1rem'
};

const bodyStyle = {
  fontFamily: 'Merriweather, serif',
  lineHeight: 1.6
};

// Philippine seasonal produce data
const seasonalData = [
  { month: 'January', items: 10, fruits: 'Mango, Pineapple, Banana, Watermelon, Papaya, Coconut, Citrus, Guava', vegetables: 'Ampalaya, Eggplant' },
  { month: 'February', items: 9, fruits: 'Mango, Pineapple, Banana, Papaya, Coconut, Citrus, Guava', vegetables: 'Carrot, Pechay' },
  { month: 'March', items: 11, fruits: 'Mango, Pineapple, Banana, Watermelon, Papaya, Coconut, Guava, Rambutan, Durian', vegetables: 'Tomato, Sitaw' },
  { month: 'April', items: 12, fruits: 'Mango, Pineapple, Banana, Watermelon, Papaya, Coconut, Guava, Rambutan, Durian, Mangosteen', vegetables: 'Kalabasa, Okra' },
  { month: 'May', items: 11, fruits: 'Mango, Banana, Watermelon, Papaya, Coconut, Rambutan, Durian, Mangosteen, Lansones', vegetables: 'Eggplant, Gabi' },
  { month: 'June', items: 10, fruits: 'Banana, Papaya, Coconut, Rambutan, Durian, Mangosteen, Lansones, Marang', vegetables: 'Ampalaya, Malunggay' },
  { month: 'July', items: 9, fruits: 'Banana, Papaya, Coconut, Durian, Mangosteen, Lansones, Marang', vegetables: 'Kamote Tops, Pechay' },
  { month: 'August', items: 8, fruits: 'Banana, Papaya, Coconut, Durian, Mangosteen, Marang', vegetables: 'Malunggay, Sitaw' },
  { month: 'September', items: 9, fruits: 'Banana, Papaya, Coconut, Durian, Mangosteen, Marang, Pomelo', vegetables: 'Kalabasa, Ampalaya' },
  { month: 'October', items: 10, fruits: 'Banana, Papaya, Coconut, Durian, Mangosteen, Pomelo, Chico, Star Apple', vegetables: 'Okra, Gabi' },
  { month: 'November', items: 11, fruits: 'Banana, Papaya, Coconut, Pomelo, Chico, Star Apple, Guyabano, Citrus, Pineapple', vegetables: 'Eggplant, Kamote' },
  { month: 'December', items: 12, fruits: 'Banana, Papaya, Coconut, Pomelo, Chico, Star Apple, Guyabano, Citrus, Pineapple, Strawberry', vegetables: 'Pechay, Carrot' }
];

export default function ConsumptionPage() {
  const [pledge, setPledge] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tips = [
    'Plan meals and shop with a list to avoid impulse buys.',
    'Store fruits and veggies properly to extend freshness.',
    'Use leftovers creatively—soups, stir‑fries, and smoothies.',
    'Compost food scraps instead of throwing them away.',
    'Buy “ugly” produce at a discount to reduce waste.'
  ];

  const handlePledgeSubmit = e => {
    e.preventDefault();
    if (pledge.trim()) setSubmitted(true);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, fruits, vegetables } = payload[0].payload;
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, boxShadow: 3, border: '1px solid #ddd' }}>
          <Typography variant="subtitle2">{month}</Typography>
          <Typography variant="body2">Fruits:</Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>{fruits}</Typography>
          <Typography variant="body2">Vegetables:</Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{vegetables}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom sx={headingStyle}>
        Responsible Consumption in the Philippines
      </Typography>

      {/* Seasonal Produce Chart */}
      <Box sx={{ width: '100%', height: 300, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ ...headingStyle, color: '#4b644a' }}>
          Philippine Seasonal Produce by Month
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={seasonalData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="items" name="Number of Produce Items" barSize={20} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Official Seasonal Calendar Link */}
      <Box sx={{ textAlign: 'right', mb: 4 }}>
        <Button
          size="small"
          component="a"
          href="https://da.gov.ph/seasonal-produce-calendar"
          target="_blank"
          rel="noopener"
        >
          View Official Seasonal Calendar
        </Button>
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
                  <ListItemText primary={tip} primaryTypographyProps={{ sx: { ...bodyStyle, color: '#341c1c' } }} />
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
          <Box component="form" onSubmit={handlePledgeSubmit}>
            <TextField
              label="My pledge to reduce food waste..."
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={pledge}
              onChange={e => setPledge(e.target.value)}
              sx={{ mb: 2, backgroundColor: '#ffffffcc', borderRadius: 1 }}
              required
              InputProps={{ sx: { fontFamily: 'Merriweather, serif' } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#4b644a',
                fontFamily: 'Sitka Text, serif',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#3a5039' }
              }}
            >
              Submit Pledge
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ ...bodyStyle, color: '#4b644a' }}>
            Thank you for your pledge! “{pledge}”
          </Typography>
        )}
      </Box>

      {/* Sources */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" sx={{ fontFamily: 'Merriweather, serif' }}>
          Sources: 
          <Button component="a" href="https://da.gov.ph/agriculture-calendar" target="_blank" rel="noopener" size="small" sx={{ textTransform: 'none', ml: 1 }}>
            DA Agricultural Calendar
          </Button>
          <Button component="a" href="https://www.philmech.gov.ph/" target="_blank" rel="noopener" size="small" sx={{ textTransform: 'none', ml: 1 }}>
            PHilMech
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}
