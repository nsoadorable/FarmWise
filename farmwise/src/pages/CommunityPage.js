import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CommunityPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ name: '', email: '', comment: '' });
  const [editId, setEditId]     = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/comments');
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchComments(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/comments/${editId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/comments', form);
      }
      setForm({ name: '', email: '', comment: '' });
      setEditId(null);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = c => {
    setForm({ name: c.name, email: c.email || '', comment: c.comment });
    setEditId(c.id);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        my: 4,
        fontFamily: "'Merriweather', serif",
        backgroundColor: '#f5f7f3',
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "'Sitka Semibold', serif", color: '#4b644a' }}
      >
        Community Hub
      </Typography>

      {/* Create / Edit form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          fontFamily: "'Merriweather', serif"
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            sx={{ flex: '1 1 200px' }}
            inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
          />
          <TextField
            label="Email (optional)"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            sx={{ flex: '1 1 200px' }}
            inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
          />
        </Box>

        <TextField
          label="Comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          multiline
          rows={4}
          required
          sx={{ width: '100%' }}
          inputProps={{ style: { fontFamily: "'Merriweather', serif" } }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#4b644a',
              fontFamily: "'Sitka Semibold', serif",
              '&:hover': { bgcolor: '#84c461' }
            }}
          >
            {editId ? 'Update Comment' : 'Post Comment'}
          </Button>
          {editId && (
            <Button
              onClick={() => {
                setEditId(null);
                setForm({ name: '', email: '', comment: '' });
              }}
              variant="outlined"
              sx={{
                fontFamily: "'Sitka Semibold', serif",
                borderColor: '#b4654a',
                color: '#b4654a',
                '&:hover': {
                  borderColor: '#341c1c',
                  color: '#341c1c'
                }
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>

      {/* Comment list */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress sx={{ color: '#4b644a' }} />
        </Box>
      ) : (
        <List sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
          {comments.map(c => (
            <ListItem
              key={c.id}
              divider
              secondaryAction={
                <Box>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(c)}
                    sx={{ color: '#4b644a' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(c.id)}
                    sx={{ color: '#b4654a' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              sx={{ fontFamily: "'Merriweather', serif" }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "'Sitka Semibold', serif", color: '#341c1c' }}
                  >
                    {c.name} — {new Date(c.created_at).toLocaleString()}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "'Merriweather', serif", color: '#4b644a' }}
                  >
                    {c.comment}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
