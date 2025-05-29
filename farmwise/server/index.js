const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./farmwisedb');
const adminAuth = require('./adminAuth');
require('dotenv').config(); // Must be loaded before using any process.env
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// ✅ Optional: Load mock data
const dbPath = path.join(__dirname, 'farmwisedb.json');
let jsonData = {};
try {
  jsonData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  console.log('Loaded farmwisedb.json:', jsonData);
} catch (err) {
  console.warn('Failed to read farmwisedb.json:', err.message);
}

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SIGN UP
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!/\S+@\S+\.\S+/.test(email) || password.length < 6) {
      return res.status(400).json({ error: 'Invalid email or password too short.' });
    }

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hash]
    );

    res.status(201).json({ id: result.insertId, email });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    console.error('Signup failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials.' });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials.' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  res.json({ token, user: { id: user.id, email: user.email } });
});

// ✅ ADMIN LOGIN
app.post('/api/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid admin credentials' });
});

// ✅ AUTH CHECK
app.get('/api/auth/me', async (req, res) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.sendStatus(401);
  try {
    const payload = jwt.verify(auth, JWT_SECRET);
    res.json({ id: payload.id, email: payload.email });
  } catch {
    res.sendStatus(401);
  }
});

// ✅ BAN USER
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

// ✅ DELETE COMMENT
app.delete('/api/comments/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// ✅ GET COMMENTS
app.get('/api/comments', async (req, res) => {
  const { filter } = req.query;
  let sql = 'SELECT * FROM comments';
  const params = [];

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

// ✅ START SERVER
app.listen(5000, () => console.log(`API running on port 5000`));
