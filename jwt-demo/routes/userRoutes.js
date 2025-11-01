const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; 


router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful', token });
});

//  verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// protected
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
});

module.exports = router;
