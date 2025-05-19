const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
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

app.listen(5000, () => console.log('API running on port 5000'));
