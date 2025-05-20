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

// Actual Philippine seasonal produce data
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
  // pledge form state
  const [pledge, setPledge] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tips = [
    'Plan meals and shop with a list to avoid impulse buys.',
    'Store fruits and veggies properly to extend freshness.',
    'Use leftovers creatively—soups, stir‑fries, and smoothies.',
    'Compost food scraps instead of throwing them away.',
    'Buy "ugly" produce at a discount to reduce waste.'
  ];

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    if (pledge.trim()) {
      setSubmitted(true);
    }
  };

  // Custom tooltip to show produce details
  const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, fruits, vegetables } = payload[0].payload;
    return (
      <Box sx={{
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 1,
        boxShadow: 3,
        border: '1px solid #ddd'
      }}>
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
      <Typography variant="h4" gutterBottom>
        Responsible Consumption in the Philippines
      </Typography>

      {/* Seasonal Produce Chart */}
      <Box sx={{ width: '100%', height: 300, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
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

      {/* Sustainable Eating Tips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Top Tips for Reducing Food Waste
        </Typography>
        <Grid container spacing={2}>
          {tips.map((tip, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <List>
                <ListItem>
                  <ListItemText primary={tip} />
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pledge Form */}
      <Box>
        <Typography variant="h6" gutterBottom>
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
              sx={{ mb: 2 }}
              required
            />
            <Button type="submit" variant="contained">
              Submit Pledge
            </Button>
          </form>
        ) : (
          <Typography variant="body1" color="success.main">
            Thank you for your pledge! "{pledge}"
          </Typography>
        )}
      </Box>
    </Container>
  );
}