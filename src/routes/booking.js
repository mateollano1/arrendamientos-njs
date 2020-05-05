const router = require('express').Router();
const booking = require('../controllers/booking');

router.post('/', booking.post);

module.exports = router;
