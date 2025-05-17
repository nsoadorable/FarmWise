import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

export default function ResourceCard({ title, description, url, source }) {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={url} target="_blank" rel="noopener">Read More</Button>
        {source && <Typography variant="caption">Source: {source}</Typography>}
      </CardActions>
    </Card>
  );
}