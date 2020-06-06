const mongoose = require('mongoose');

const config = require('../config');

const dbUrl = config.dbUrlMongoDB;

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }, // To avoid deprecated options
  (err) => {
    if (err) console.log('Error', err);
    else console.log('Mongodb connected');
  }
);

module.exports = mongoose;
