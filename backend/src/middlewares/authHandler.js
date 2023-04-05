const decode = require('../utils/token').decode;

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = decode(token)
    req.user = decoded.id; // add the decoded user object to the request object
    next(); // call the next middleware or controller function
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

module.exports = authMiddleware;


