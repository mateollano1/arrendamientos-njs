const router = require('express').Router();
const roomModel = require('../models/room/model');
router.get('/search', (req, res) => {
  return res.json({ Message: 'Hello world' });
});

router.post('/create', (req, res) => {
  try {
    const room = new roomModel(req.body);
    room.save();
    return res.status(200).json({ Message: 'Room created' });
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
});

module.exports = router;
