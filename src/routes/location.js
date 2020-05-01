const router = require('express').Router();
const locationModel = require('../models/location/model');

router.get('/location', async (req, res) => {
  try {
    const location = await locationModel.find({});
    return res.status(200).json(location);
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
});

router.post('/location', (req, res) => {
  try {
    const location = new locationModel(req.body);
    location.save();
    return res.status(200).json({ Message: 'Location created' });
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
});

module.exports = router;
