import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Paper
} from '@mui/material';
import AdminCommunityHub from './AdminCommunityHub';

export default function AdminDashboard({ onLogout }) {
  const [panel, setPanel] = useState('community');

  useEffect(() => {
    // Optional: redirect or alert if token is missing
    const token = localStorage.getItem('adminToken');
    if (!token) {
      onLogout();
    }
  }, [onLogout]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // ✅ Clear token on logout
    onLogout();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7f3' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            borderRight: 'none'
          }
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            height: '100%',
            bgcolor: '#4b644a',
            color: '#fff',
            borderRadius: 0
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              p: 3,
              fontFamily: "'Sitka Semibold', serif",
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            Admin Panel
          </Typography>
          <List sx={{ py: 1 }}>
            <ListItem 
              button 
              selected={panel === 'community'}
              onClick={() => setPanel('community')}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)'
                }
              }}
            >
              <ListItemText 
                primary="Community Hub" 
                primaryTypographyProps={{
                  fontFamily: "'Merriweather', serif"
                }}
              />
            </ListItem>

            {/* Additional panels can go here */}

            <ListItem sx={{ mt: 2, px: 2 }}>
              <Button
                onClick={handleLogout}
                fullWidth
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                  fontFamily: "'Sitka Semibold', serif",
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Drawer>

      {/* Main Content */}
      <Box 
        sx={{ 
          flex: 1, 
          p: 4,
          maxWidth: 'calc(100% - 240px)'
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: '#fff',
            borderRadius: 2,
            minHeight: 'calc(100vh - 64px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {panel === 'community' && <AdminCommunityHub />}
        </Paper>
      </Box>
    </Box>
  );
}
