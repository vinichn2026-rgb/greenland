import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────
// POST /api/contacts  —  save a contact form submission
// Body: { name, email, mobile, subject, message }
// ─────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  if (!name || !email || !mobile || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO contacts (name, email, mobile, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name.trim(), email.trim(), mobile.trim(), subject.trim(), message.trim()]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Contact form submitted successfully',
    });
  } catch (err) {
    console.error('POST /api/contacts error:', err);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

// ─────────────────────────────────────────────────────────
// GET /api/contacts  —  retrieve all submissions (admin use)
// ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/contacts error:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

export default router;
