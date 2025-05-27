import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import AdminCommunityHub from './AdminCommunityHub';

export default function AdminDashboard({ onLogout }) {
  const [panel, setPanel] = useState('community');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer variant="permanent" sx={{ width: 220, flexShrink: 0 }}>
        <Box sx={{ width: 220, bgcolor: '#4b644a', color: '#fff', height: '100%' }}>
          <Typography variant="h6" sx={{ p: 2 }}>Admin Panel</Typography>
          <List>
            <ListItem button selected={panel === 'community'} onClick={() => setPanel('community')}>
              <ListItemText primary="Community Hub" />
            </ListItem>
            {/* Add more admin panels here */}
            <ListItem>
              <Button onClick={onLogout} color="inherit" fullWidth>Logout</Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flex: 1, p: 4 }}>
        {panel === 'community' && <AdminCommunityHub />}
      </Box>
    </Box>
  );
}