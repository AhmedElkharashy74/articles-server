const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);
  console.log(authHeader?.startsWith('Bearer '));
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
