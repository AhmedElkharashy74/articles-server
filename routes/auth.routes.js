const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN) {
    return res.status(401).json({ error: 'Invalid email' });
  }

  const isMatch = await bcrypt.compare(password, process.env.HASHED_PASSWORD);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid pass' });
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  res.status(200).json({ token });
});

module.exports = router;
