const router = require('express').Router();
const Agency = require('../models/agency/model');

router.get('/agency', async (req, res) => {
  try {
    const agency = await Agency.find({});
    return res.status(200).json(agency);
  } catch (error) {
    return res.status(500).json({ Message: 'Somethin went wrong' });
  }
});

router.post('/agency', (req, res) => {
  const agency = new Agency(req.body);
  try {
    agency.save();
    return res.json({ Message: 'Agency created' });
  } catch (error) {
    return res.status(500).json({ Message: 'Somethin went wrong' });
  }
});

module.exports = router;
