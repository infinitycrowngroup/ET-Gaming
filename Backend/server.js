import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();

// Security + logging
app.use(helmet());
app.use(morgan('combined'));

// CORS: allow all by default, configure in production via environment if needed
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));

// Body parsing
app.use(express.json({ limit: '50kb' }));

// Health check
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Contact route
app.use('/contact', contactRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Internal Server Error' });
});

// Safety: catch unhandled rejections and exceptions and log them (do not crash by default)
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err && err.stack ? err.stack : err);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
