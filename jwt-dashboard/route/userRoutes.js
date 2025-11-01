// userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWTSECRET = process.env.JWTSECRET || 'not56789';

// Simple in-memory users array for demo
let users = [];

// REGISTER
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  if (users.find(user => user.email === email))
    return res.status(400).json({ error: 'Email already exists' });

  // For production, hash password with bcrypt
  users.push({ email, password });
  return res.status(201).json({ message: 'User registered successfully' });
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  const user = users.find(u => u.email === email && u.password === password);
  if (!user)
    return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email }, JWTSECRET, { expiresIn: '1h' });
  return res.json({ token });
});

// Middleware for protected routes (optional, for dashboard etc.)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;
  if (!token)
    return res.status(401).json({ error: 'Authorization required' });

  jwt.verify(token, JWTSECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
}

// DASHBOARD (protected)
router.get('/dashboard', authenticateToken, (req, res) => {
  return res.json({ message: `Welcome to the dashboard, ${req.user.email}` });
});



module.exports = router;
