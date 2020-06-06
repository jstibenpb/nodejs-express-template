const mongoose = require('../../../services/mongoose');

const User = mongoose.model(
  'User',
  { name: String, lastName: String, city: String, phone: String },
  'users'
);

module.exports = {
  User,
};
