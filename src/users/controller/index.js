const schemes = require('../models/mongoose');

module.exports.newUser = async (res, parameters) => {
  const user = new schemes.User(parameters);
  user.save((err) => {
    if (err)
      return res.status(500).json({ error: 'Internal Server Error', data: [] });
    return res.status(200).json({ message: 'user saved', data: [] });
  });
};

module.exports.listUser = async (res) => {
  schemes.User.find({}, (err, messages) => {
    if (err)
      return res.status(500).json({ error: 'Internal Server Error', data: [] });
    return res.status(200).json({ message: 'Users', data: messages });
  });
};
