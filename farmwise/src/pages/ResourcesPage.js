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
        
        // Using a mock API URL - replace with your actual educational resources endpoint
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
        
        // Filter for only educational content
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

  // Filter resources by type
  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter);

  // Mock data structure if API is not available
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
    // Add more mock items as needed
  ];

  // Use mock data if no resources loaded
  const displayResources = resources.length > 0 ? filteredResources : mockResources;

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Educational Farming Resources
      </Typography>

      {/* Filter chips */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip 
          label="All" 
          onClick={() => setFilter('all')} 
          color={filter === 'all' ? 'primary' : 'default'} 
        />
        <Chip 
          label="Guides" 
          onClick={() => setFilter('guide')} 
          color={filter === 'guide' ? 'primary' : 'default'} 
        />
        <Chip 
          label="Videos" 
          onClick={() => setFilter('video')} 
          color={filter === 'video' ? 'primary' : 'default'} 
        />
        <Chip 
          label="Research" 
          onClick={() => setFilter('research')} 
          color={filter === 'research' ? 'primary' : 'default'} 
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error} - Showing sample resources instead
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {displayResources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id || resource.url}>
              <ResourceCard
                title={resource.title}
                description={resource.description}
                url={resource.url}
                source={resource.source}
                type={resource.type}
                level={resource.level}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}