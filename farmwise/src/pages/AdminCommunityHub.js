import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Divider,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

export default function AdminCommunityHub() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [bannedEmail, setBannedEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('adminToken');

  // Fix: Properly define fetchComments with useCallback
  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/comments${filter ? `?filter=${filter}` : ''}`);
      setComments(res.data);
    } catch (err) {
      setError('Failed to fetch comments');
    }
  }, [filter]); // Ensures function updates only when filter changes

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Ensures it runs when fetchComments updates

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c.id !== id));
      setSuccess('Comment deleted successfully');
    } catch (err) {
      setError('Failed to delete comment');
    }
  }

  const handleBan = async () => {
    try {
      await axios.post(
        '/api/admin/ban',
        { email: bannedEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(`User ${bannedEmail} has been banned`);
      setBannedEmail('');
    } catch (err) {
      setError('Failed to ban user');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontFamily="'Sitka Semibold', serif">
        Community Hub Management
      </Typography>

      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>}

      <Box sx={{ my: 2 }}>
        <TextField
          label="Filter Comments"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(comment.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={comment.comment} secondary={comment.email} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom fontFamily="'Sitka Semibold', serif">
          Ban a User
        </Typography>
        <TextField
          label="User Email"
          fullWidth
          value={bannedEmail}
          onChange={(e) => setBannedEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<BlockIcon />}
          onClick={handleBan}
          disabled={!bannedEmail}
        >
          Ban User
        </Button>
      </Box>
    </Box>
  );
}
