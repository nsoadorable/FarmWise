import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppContext from '../context/AppContext';

export default function Navbar() {
  const { state, dispatch } = useContext(AppContext);
  const isLoggedIn = !!state.token;

  const mainLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/eco-practices', label: 'Eco Practices' },
    { path: '/consumption', label: 'Consumption' },
    { path: '/community', label: 'Community' },
    { path: '/tools', label: 'Tools' },
    { path: '/contact', label: 'Contact' }
  ];

  const guestLinks = [
    { path: '/login', label: 'Log In' },
    { path: '/signup', label: 'Sign Up' }
  ];
  const authLinks = [
    { action: () => dispatch({ type: 'LOGOUT' }), label: 'Logout' }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4b644a' }}>
      <Toolbar>
        {/* Logo and Title Group (both clickable) */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            flexGrow: 1,
            '&:hover': {
              opacity: 0.9
            }
          }}
        >
          <Box 
            component="img" 
            src="img/FW_Logo.png" 
            alt="FarmWise Logo" 
            sx={{ 
              height: 50, 
              mr: 2,
              cursor: 'pointer'
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Sitka Semibold, serif',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': {
                color: '#84c461'
              }
            }}
          >
            FarmWise
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex' }}>
          {mainLinks.map(link => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              sx={{ 
                color: '#fff', 
                fontFamily: 'Merriweather, serif', 
                '&:hover': { 
                  backgroundColor: '#84c461', 
                  color: '#341c1c' 
                } 
              }}
            >
              {link.label}
            </Button>
          ))}
          
          {!isLoggedIn
            ? guestLinks.map(link => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{ 
                    color: '#fff', 
                    fontFamily: 'Merriweather, serif', 
                    '&:hover': { 
                      backgroundColor: '#84c461', 
                      color: '#341c1c' 
                    } 
                  }}
                >
                  {link.label}
                </Button>
              ))
            : authLinks.map(link => (
                <Button
                  key={link.label}
                  onClick={link.action}
                  sx={{ 
                    color: '#fff', 
                    fontFamily: 'Merriweather, serif', 
                    '&:hover': { 
                      backgroundColor: '#84c461', 
                      color: '#341c1c' 
                    } 
                  }}
                >
                  {link.label}
                </Button>
              ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}