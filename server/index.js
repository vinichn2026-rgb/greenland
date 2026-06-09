import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import plotsRouter    from './routes/plots.js';
import contactsRouter from './routes/contacts.js';
import usersRouter    from './routes/users.js';

dotenv.config();

const app  = express();
const PORT = process.env.SERVER_PORT || 3001;

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Routes ────────────────────────────────────────────────
app.use('/api/plots',    plotsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users',    usersRouter);

// Health check
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

// 404 handler for unknown routes
app.use((_req, res) =>
  res.status(404).json({ error: 'Route not found' })
);

// ── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Greenland API server running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
