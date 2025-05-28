const express = require('express');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Here, you’d add validation, password hashing, and database storage
  res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;
