// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = useCallback(async () => {
    try {
        const res = await axios.get(`/api/comments${filter ? `?filter=${filter}` : ''}`);
        setComments(res.data);
    } catch (err) {
        setError('Failed to fetch comments');
    }
}, [filter]); // Dependencies: rerun when filter changes

useEffect(() => {
    fetchComments();
}, [fetchComments]); // Dependencies make it consistent


  const handleAdminLogin = async () => {
    try {
      const res = await axios.post('/api/auth/admin-login', {
        username: 'admin',      // Replace with form values if needed
        password: 'admin123',
      });
      localStorage.setItem('adminToken', res.data.token);
      setToken(res.data.token);
      alert('Admin login successful');
    } catch {
      alert('Invalid admin credentials');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Comment Moderation</h2>
      {!token && <button onClick={handleAdminLogin}>Login as Admin</button>}
      {token && (
        <>
          <input
            type="text"
            placeholder="Filter comments"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                {comment.comment}
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
