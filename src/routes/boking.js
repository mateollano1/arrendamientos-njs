const router = require('express').Router();
const bokingModel = require('../models/booking/model');

router.post('/create', (req, res) => {
  try {
    const boking = new bokingModel(req.body);
    boking.save();
    return res.status(200).json({ Message: 'Boking created' });
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
});

module.exports = router;
