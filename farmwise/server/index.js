const express = require('express');
const cors    = require('cors');
const pool    = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/comments', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM comments ORDER BY created_at DESC'
  );
  res.json(rows);
});

app.post('/api/comments', async (req, res) => {
  const { name, email, comment } = req.body;
  const [result] = await pool.query(
    `INSERT INTO comments (name, email, comment)
     VALUES (?, ?, ?)`,
    [name, email, comment]
  );

  const [newRow] = await pool.query(
    'SELECT * FROM comments WHERE id = ?',
    [result.insertId]
  );
  res.status(201).json(newRow[0]);
});

app.put('/api/comments/:id', async (req, res) => {
  const { id }       = req.params;
  const { name, email, comment } = req.body;
  await pool.query(
    `UPDATE comments
     SET name = ?, email = ?, comment = ?
     WHERE id = ?`,
    [name, email, comment, id]
  );
  const [updated] = await pool.query(
    'SELECT * FROM comments WHERE id = ?',
    [id]
  );
  res.json(updated[0]);
});

app.delete('/api/comments/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM comments WHERE id = ?', [id]);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Comments API running on port ${PORT}`);
});
