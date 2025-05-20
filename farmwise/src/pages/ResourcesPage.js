import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert, Box, Chip } from '@mui/material';
import ResourceCard from '../components/ResourceCard';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api.example.com/educational-farming-resources', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to load resources: ${response.status}`);
        }

        const data = await response.json();

        // Filter for educational content
        const educationalResources = data.filter(item =>
          item.categories?.includes('education') ||
          item.type === 'guide' ||
          item.title?.toLowerCase().includes('how to') ||
          item.description?.toLowerCase().includes('tutorial')
        );

        setResources(educationalResources);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load educational resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Mock resources if API fails or empty
  const mockResources = [
    {
      id: 1,
      title: 'Sustainable Farming Techniques Guide',
      description: 'Comprehensive guide covering organic farming, crop rotation, and soil conservation methods.',
      url: '#',
      source: 'FAO',
      type: 'guide',
      categories: ['education', 'sustainability'],
      level: 'beginner'
    },
    {
      id: 2,
      title: 'How to Start a Small Farm: Video Course',
      description: 'Step-by-step video tutorials for new farmers covering everything from land preparation to harvest.',
      url: '#',
      source: 'Farmers Academy',
      type: 'video',
      categories: ['education', 'beginner'],
      level: 'beginner'
    },
  ];

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter);

  const displayResources = resources.length > 0 ? filteredResources : mockResources;

  return (
    <Container sx={{ my: 4, fontFamily: "'Merriweather', serif", color: '#341c1c' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 3, 
          fontFamily: "'Sitka', serif", 
          fontWeight: 600, 
          color: '#4b644a' 
        }}
      >
        Educational Farming Resources
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {['all', 'guide', 'video', 'research'].map(type => (
          <Chip
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            onClick={() => setFilter(type)}
            color={filter === type ? 'success' : 'default'}
            variant={filter === type ? 'filled' : 'outlined'}
            sx={{
              fontFamily: "'Sitka', serif",
              fontWeight: 600,
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': {
                backgroundColor: '#84c461',
                color: '#fff',
              }
            }}
          />
        ))}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress sx={{ color: '#4b644a' }} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3, fontFamily: "'Merriweather', serif" }}>
          {error} - Showing sample resources instead
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {displayResources.map(resource => (
            <Grid item xs={12} sm={6} md={4} key={resource.id || resource.url}>
              <ResourceCard {...resource} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
