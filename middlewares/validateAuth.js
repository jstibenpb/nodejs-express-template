/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const config = require('../config');

const checkIfAuthenticated = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token)
    return res.status(401).json({
      mensaje: 'No token provided',
      status: 401,
    });

  jwt.verify(token, config.API_KEY_JWT, (err, decoded) => {
    if (err)
      return res.status(401).json({ mensaje: 'Invalid token', status: 401 });
    req.user = decoded;
    next();
  });
};

module.exports = { checkIfAuthenticated };
