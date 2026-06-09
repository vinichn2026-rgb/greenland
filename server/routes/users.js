import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────
// POST /api/users/register
// Body: { name, email, password }
// ─────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // Check duplicate email
    const [[existing]] = await pool.query(
      'SELECT id FROM users WHERE email = ?', [email.trim()]
    );
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), hash]
    );

    res.status(201).json({
      id:    result.insertId,
      name:  name.trim(),
      email: email.trim().toLowerCase(),
      message: 'Account created successfully',
    });
  } catch (err) {
    console.error('POST /api/users/register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ─────────────────────────────────────────────────────────
// POST /api/users/login
// Body: { email, password }
// ─────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const [[user]] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return safe user info (no password hash)
    res.json({
      id:    user.id,
      name:  user.name,
      email: user.email,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('POST /api/users/login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
