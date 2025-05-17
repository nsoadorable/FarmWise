import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/eco-practices', label: 'Eco Practices' },
    { path: '/consumption', label: 'Consumption' },
    { path: '/community', label: 'Community' },
    { path: '/tools', label: 'Tools' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FarmWise
        </Typography>
        {links.map(link => (
          <Button color="inherit" component={Link} to={link.path} key={link.path}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
