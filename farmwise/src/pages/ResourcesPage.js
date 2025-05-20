import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import ResourceCard from '../components/ResourceCard';

export default function ResourcesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'sustainable agriculture',
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            pageSize: 12
          }
        });
        setArticles(res.data.articles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F5F0EB', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Sitka Semibold, serif' }}>
          Educational Resources
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {articles.map((a, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <ResourceCard
                  title={a.title}
                  description={a.description}
                  url={a.url}
                  source={a.source.name}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
