const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

app.use(cors());
app.use(express.json());

// Demo user for learning. In production, store users in MongoDB and hash passwords.
const demoUser = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  name: 'RMS Administrator',
  role: 'Admin'
};

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'RMS Academy API is running' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  if (username !== demoUser.username || password !== demoUser.password) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }

  const token = jwt.sign(
    { id: demoUser.id, username: demoUser.username, role: demoUser.role },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.json({
    success: true,
    token,
    user: {
      id: demoUser.id,
      username: demoUser.username,
      name: demoUser.name,
      role: demoUser.role
    }
  });
});

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required.' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

app.get('/api/profile', authenticate, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.listen(PORT, () => {
  console.log(`RMS Academy API running on port ${PORT}`);
});
