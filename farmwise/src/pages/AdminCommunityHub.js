import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, IconButton, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

export default function AdminCommunityHub() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:5000/api/comments');
    setComments(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchComments(); }, []);

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/comments/${id}`);
    fetchComments();
  };

  const handleBan = async email => {
    // Implement ban logic in your backend
    await axios.post('http://localhost:5000/api/admin/ban', { email });
    fetchComments();
  };

  // Example filter: only show comments with "community" keyword
  const filtered = comments.filter(c => c.comment.toLowerCase().includes('community'));

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Moderate Community Hub</Typography>
      <List>
        {filtered.map(c => (
          <ListItem
            key={c.id}
            secondaryAction={
              <Box>
                <IconButton onClick={() => handleDelete(c.id)} color="error"><DeleteIcon /></IconButton>
                {c.email && (
                  <IconButton onClick={() => handleBan(c.email)} color="warning"><BlockIcon /></IconButton>
                )}
              </Box>
            }
          >
            <ListItemText
              primary={`${c.name} (${c.email || 'No email'})`}
              secondary={c.comment}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}