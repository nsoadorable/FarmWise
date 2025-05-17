import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';

export default function CommunityPage() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments(prev => [...prev, { id: Date.now(), text }]);
    setText('');
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Community Hub
      </Typography>

      {/* Comment Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          label="Share your thoughts..."
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={e => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Post Comment
        </Button>
      </Box>

      {/* Comment List */}
      {comments.length === 0 ? (
        <Typography variant="body1">No comments yet—be the first to post!</Typography>
      ) : (
        <List>
          {comments.map(c => (
            <ListItem key={c.id} divider>
              <ListItemText primary={c.text} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
