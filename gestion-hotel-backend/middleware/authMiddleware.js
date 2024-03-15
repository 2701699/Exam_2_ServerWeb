const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
