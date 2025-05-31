const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise'); // Promise-based MySQL connection

dotenv.config();

const app = express();
app.use(cors({ origin: '*' })); // Enable CORS for all origins
app.use(express.json()); // Ensure request body is properly parsed

// Database Connection
const pool = mysql.createPool({
  host: 'localhost',    // Replace with your HeidiSQL host if different
  user: 'root',         // Your HeidiSQL database username
  password: 'password', // Your HeidiSQL database password
  database: 'farmwisedb', // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
pool.getConnection()
  .then(conn => {
    console.log('Database connected successfully!');
    conn.release();
  })
  .catch(err => {
    console.error(' Database connection failed:', err);
  });

// Root Route (Basic Check)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Signup Route with Database Validation
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email already exists
    const [existingUser] = await pool.query(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 12);

    // Insert user into database
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hash]
    );

    res.status(201).json({ id: result.insertId, firstName, lastName, email });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
