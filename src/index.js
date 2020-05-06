const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('../config/config');

const routes = require('./routes');

const app = express();

//Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
  mongoose
    .connect(
      config.MONGODB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
});
