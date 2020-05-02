const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

//Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes)

app.listen(4000, () => {
  console.log('Server running on port 4000');
  mongoose
    .connect(
      'mongodb://localhost/arrendamientos',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
});
