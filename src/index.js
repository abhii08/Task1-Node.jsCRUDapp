const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoute');

const app = express();

app.use(bodyParser.json());

app.use('/api', contactRoutes);

module.exports = app;