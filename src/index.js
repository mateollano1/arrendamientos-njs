const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('./models/room/model');
require('./models/location/model');
const roomsRouter = require('./routes/rooms');
const agencyRouter = require('./routes/agency');
const locationRouter = require('./routes/location');
const bookingRouter = require('./routes/boking');

//Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/agencyapollo/api/rooms', roomsRouter);
app.use('/agencyapollo', agencyRouter);
app.use('/agencyapollo', locationRouter);
app.use('/agencyapollo/booking', bookingRouter);

app.listen(4000, () => {
  console.log('Server running on port 4000');
  mongoose
    .connect(
      'mongodb+srv://empresariales:empresariales@cluster0-7jtxs.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
});
