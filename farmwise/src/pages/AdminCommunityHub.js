import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function AdminCommunityHub() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('http://localhost:5000/api/comments');
      setComments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComments(); }, []);

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
      fetchComments();
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  const handleBan = async email => {
    try {
      await axios.post('http://localhost:5000/api/admin/ban', { email });
      fetchComments();
    } catch (err) {
      setError('Failed to ban user');
    }
  };

  const filtered = comments.filter(c => c.comment.toLowerCase().includes('community'));

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: "'Sitka Semibold', serif",
            color: '#4b644a'
          }}
        >
          Community Moderation
        </Typography>
        <Button
          onClick={fetchComments}
          startIcon={<RefreshIcon />}
          sx={{
            fontFamily: "'Sitka Semibold', serif",
            color: '#4b644a',
            borderColor: '#4b644a',
            '&:hover': {
              backgroundColor: 'rgba(75, 100, 74, 0.1)'
            }
          }}
          variant="outlined"
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, fontFamily: "'Merriweather', serif" }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#4b644a' }} />
        </Box>
      ) : filtered.length === 0 ? (
        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f7f3' }}>
          <Typography variant="body1" sx={{ fontFamily: "'Merriweather', serif" }}>
            No community comments to moderate
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #e0e0e0' }}>
          <List sx={{ p: 0 }}>
            {filtered.map((c, index) => (
              <React.Fragment key={c.id}>
                <ListItem
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    '&:hover': {
                      backgroundColor: '#f5f7f3'
                    }
                  }}
                  secondaryAction={
                    <Box>
                      <IconButton 
                        onClick={() => handleDelete(c.id)} 
                        sx={{ color: '#d32f2f' }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      {c.email && (
                        <IconButton 
                          onClick={() => handleBan(c.email)} 
                          sx={{ color: '#ff9800' }}
                          aria-label="ban"
                        >
                          <BlockIcon />
                        </IconButton>
                      )}
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography 
                        sx={{ 
                          fontFamily: "'Sitka Semibold', serif",
                          color: '#4b644a'
                        }}
                      >
                        {c.name} {c.email && `(${c.email})`}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        sx={{ 
                          fontFamily: "'Merriweather', serif",
                          color: '#341c1c'
                        }}
                      >
                        {c.comment}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < filtered.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}