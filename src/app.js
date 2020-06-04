const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

//Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

module.exports = app;