const mongoose = require('mongoose');
const config = require('../config/config');
const app = require('./app')


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
