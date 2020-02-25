const express = require('express');

const app = express();

const version = require('./routes/version');

app.use(version);

module.exports = {
  path: '/api',
  handler: app
};
