// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db'); // adjust path if needed

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  try {
    console.log('Incoming signup:', req.body);

    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hash = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hash]
    );

    res.status(201).json({ id: result.insertId, email });
  } catch (error) {
    console.error('Signup failed:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
