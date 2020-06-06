const status = require('../src/health/routes');
const users = require('../src/users/routes');

module.exports = (app) => {
  app.use('/status', status);
  app.use('/users', users);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
