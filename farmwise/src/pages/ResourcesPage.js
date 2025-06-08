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
        
        const educationalResources = data.filter(item => 
          (item.categories?.includes('education') || item.type === 'guide' || item.type === 'research' ||
           item.title?.toLowerCase().includes('how to') ||
           item.description?.toLowerCase().includes('tutorial')) &&
          item.type !== 'video'
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

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter);

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
  ];

  const displayResources = resources.length > 0 ? filteredResources : mockResources;

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        my: 4,
        fontFamily: "'Merriweather', serif",
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      {/* ========== UNDER CONSTRUCTION NOTICE ========== */}
      <Typography 
        variant="h3"
        sx={{ 
          fontFamily: "'Sitka Semibold', serif",
          color: '#4b644a',
          mb: 3
        }}
      >
        🚧 Page Under Construction 🚧
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Merriweather', serif" }} >
        We're working hard to bring you valuable farming resources
      </Typography>
      <Typography sx={{ fontFamily: "'Merriweather', serif" }}>
        Check back soon for educational materials, guides, and research
      </Typography>

      {/*
        ========== ORIGINAL PAGE CONTENT (COMMENTED OUT) ==========
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            mb: 4,
            fontFamily: "'Sitka Semibold', serif",
            color: '#1d2c12',
            textAlign: 'center'
          }}
        >
          Educational Farming Resources
        </Typography>

        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          gap: 1, 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Chip 
            label="All" 
            onClick={() => setFilter('all')} 
            variant={filter === 'all' ? 'filled' : 'outlined'}
            sx={{
              fontFamily: "'Merriweather', serif",
              backgroundColor: filter === 'all' ? '#4b644a' : 'transparent',
              color: filter === 'all' ? '#fff' : '#4b644a',
              borderColor: '#4b644a',
              '&:hover': {
                backgroundColor: filter === 'all' ? '#3a4f39' : 'rgba(75, 100, 74, 0.1)'
              }
            }}
          />
          <Chip 
            label="Guides" 
            onClick={() => setFilter('guide')} 
            variant={filter === 'guide' ? 'filled' : 'outlined'}
            sx={{
              fontFamily: "'Merriweather', serif",
              backgroundColor: filter === 'guide' ? '#4b644a' : 'transparent',
              color: filter === 'guide' ? '#fff' : '#4b644a',
              borderColor: '#4b644a',
              '&:hover': {
                backgroundColor: filter === 'guide' ? '#3a4f39' : 'rgba(75, 100, 74, 0.1)'
              }
            }}
          />
          <Chip 
            label="Research" 
            onClick={() => setFilter('research')} 
            variant={filter === 'research' ? 'filled' : 'outlined'}
            sx={{
              fontFamily: "'Merriweather', serif",
              backgroundColor: filter === 'research' ? '#4b644a' : 'transparent',
              color: filter === 'research' ? '#fff' : '#4b644a',
              borderColor: '#4b644a',
              '&:hover': {
                backgroundColor: filter === 'research' ? '#3a4f39' : 'rgba(75, 100, 74, 0.1)'
              }
            }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={6}>
            <CircularProgress sx={{ color: '#4b644a' }} />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              fontFamily: "'Merriweather', serif",
              backgroundColor: '#f8d7da',
              color: '#721c24'
            }}
          >
            {error} - Showing sample resources instead
          </Alert>
        ) : (
          <Grid container spacing={4}>
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
      */}
    </Container>
  );
}