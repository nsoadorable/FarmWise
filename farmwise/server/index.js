const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const adminAuth = require('./adminAuth'); // Add this line after other imports
require('dotenv').config();

const app = express();
app.use(cors(), express.json());

// SIGN UP
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!/\S+@\S+\.\S+/.test(email) || password.length < 6) {
    return res.status(400).json({ error: 'Invalid email or password too short.' });
  }
  // Hash
  const hash = await bcrypt.hash(password, 12);
  try {
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, hash]
    );
    res.status(201).json({ id: result.insertId, email });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    console.error(err);
    res.sendStatus(500);
  }
});

// LOG IN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // Fetch user
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const user = rows[0];
  // Compare
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
  // Issue JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.json({ token, user: { id: user.id, email: user.email } });
});

// Admin login (POST /api/auth/admin-login)
app.post('/api/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  // Replace with secure check in production!
  if (
    username === (process.env.ADMIN_USERNAME || 'admin') &&
    password === (process.env.ADMIN_PASSWORD || 'admin123')
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '2h',
    });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid admin credentials' });
});

// Example of a protected route (optional)
app.get('/api/auth/me', async (req, res) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.sendStatus(401);
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET);
    res.json({ id: payload.id, email: payload.email });
  } catch {
    res.sendStatus(401);
  }
});

// Ban user (POST /api/admin/ban)
app.post('/api/admin/ban', adminAuth, async (req, res) => {
  const { email } = req.body;
  try {
    const [result] = await pool.query('UPDATE users SET banned = 1 WHERE email = ?', [email]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User banned' });
  } catch (err) {
    res.status(500).json({ message: 'Error banning user' });
  }
});

// Delete comment (DELETE /api/comments/:id)
app.delete('/api/comments/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// Get comments (optionally filter by keyword)
app.get('/api/comments', async (req, res) => {
  const { filter } = req.query;
  let sql = 'SELECT * FROM comments';
  let params = [];
  if (filter) {
    sql += ' WHERE comment LIKE ?';
    params.push(`%${filter}%`);
  }
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

app.listen(5000, () => console.log('API running on port 5000'));

// Database migration: ALTER TABLE users ADD COLUMN banned TINYINT(1) DEFAULT 0;
