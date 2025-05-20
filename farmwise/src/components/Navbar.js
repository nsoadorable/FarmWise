import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Navbar() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/eco-practices', label: 'Eco Practices' },
    { path: '/consumption', label: 'Consumption' },
    { path: '/community', label: 'Community' },
    { path: '/tools', label: 'Tools' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login'},
    { path: '/register', label: 'register'}
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4b644a' }}>
      <Toolbar>
        <Box component="img" src="img/FW_Logo.png" alt="FarmWise Logo"
         sx={{height:50, marginRight: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Sitka Text, serif' }}>
          FarmWise
        </Typography>
        {links.map(link => (
          <Button key={link.path}
            component={Link}
            to={link.path}
            sx={{
              color: '#fff',
              fontFamily: 'Merriweather, serif',
              '&:hover': {
                backgroundColor: '#84c461',
                color: '#341c1c'
              }
            }}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
