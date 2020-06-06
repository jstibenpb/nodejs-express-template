require('dotenv').config();

const config = {
  port: 5000,
  dbUrlMongoDB: process.env.dbUrlMongoDB,
};

module.exports = config;
