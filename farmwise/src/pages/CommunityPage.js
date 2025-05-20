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

const headingFont = '"Sitka Semibold", serif';
const bodyFont = '"Merriweather", serif';

const colors = {
  darkGreen: '#4b644a',
  mediumGreen: '#84c461',
  darkBrown: '#341c1c',
  warmTan: '#b4654a',
};

export default function CommunityPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ name: '', email: '', comment: '' });
  const [editId, setEditId]     = useState(null);

  // Fetch all comments
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

  // Handle input changes
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update comment
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

  // Prepare form for editing
  const handleEdit = c => {
    setForm({ name: c.name, email: c.email || '', comment: c.comment });
    setEditId(c.id);
  };

  // Delete a comment
  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ my: 4, fontFamily: bodyFont, color: colors.darkBrown }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ fontFamily: headingFont, color: colors.darkGreen }}
      >
        Community Hub
      </Typography>

      {/* Create / Edit form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{ 
            mr: 2, mb: 2, width: '200px', 
            '& label': { fontFamily: bodyFont, color: colors.darkGreen },
            '& .MuiInputBase-input': { fontFamily: bodyFont, color: colors.darkBrown },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.darkGreen },
              '&:hover fieldset': { borderColor: colors.mediumGreen },
              '&.Mui-focused fieldset': { borderColor: colors.mediumGreen },
            },
          }}
          required
        />
        <TextField
          label="Email (optional)"
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={{ 
            mr: 2, mb: 2, width: '200px',
            '& label': { fontFamily: bodyFont, color: colors.darkGreen },
            '& .MuiInputBase-input': { fontFamily: bodyFont, color: colors.darkBrown },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.darkGreen },
              '&:hover fieldset': { borderColor: colors.mediumGreen },
              '&.Mui-focused fieldset': { borderColor: colors.mediumGreen },
            },
          }}
        />
        <TextField
          label="Comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          multiline
          rows={2}
          sx={{ 
            mb: 2, width: '100%',
            '& label': { fontFamily: bodyFont, color: colors.darkGreen },
            '& .MuiInputBase-input': { fontFamily: bodyFont, color: colors.darkBrown },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.darkGreen },
              '&:hover fieldset': { borderColor: colors.mediumGreen },
              '&.Mui-focused fieldset': { borderColor: colors.mediumGreen },
            },
          }}
          required
        />
        <Button 
          type="submit" 
          variant="contained"
          sx={{ 
            backgroundColor: colors.darkGreen,
            fontFamily: bodyFont,
            '&:hover': { backgroundColor: colors.mediumGreen }
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
            sx={{ ml: 2, fontFamily: bodyFont, color: colors.warmTan }}
          >
            Cancel
          </Button>
        )}
      </Box>

      {/* Comment list */}
      {loading ? (
        <CircularProgress sx={{ color: colors.darkGreen }} />
      ) : (
        <List sx={{ 
          '& .MuiListItem-root': { fontFamily: bodyFont, color: colors.darkBrown },
          '& .MuiListItemText-primary': { fontFamily: headingFont, color: colors.darkGreen },
          '& .MuiListItemText-secondary': { fontFamily: bodyFont, color: colors.warmTan },
        }}>
          {comments.map(c => (
            <ListItem 
              key={c.id} 
              divider
              secondaryAction={
                <>
                  <IconButton onClick={() => handleEdit(c)} sx={{ color: colors.mediumGreen }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(c.id)} sx={{ color: colors.warmTan }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${c.name} — ${new Date(c.created_at).toLocaleString()}`}
                secondary={c.comment}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
