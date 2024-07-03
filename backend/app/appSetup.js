
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

module.exports = app;