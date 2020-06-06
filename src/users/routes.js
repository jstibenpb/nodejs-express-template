const express = require('express');

const controller = require('./controller/index');

const router = express.Router();

router.post('/api/v1/newUser', (req, res) => {
  controller.newUser(res, req.body);
});

router.get('/api/v1/list', (req, res) => {
  controller.listUser(res, req.query);
});

module.exports = router;
