// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'No token provided' });
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Failed to authenticate token' });
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
