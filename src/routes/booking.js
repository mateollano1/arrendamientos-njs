const router = require('express').Router();
const booking = require('../controllers/booking');

router.post('/', booking.post);S

module.exports = router;
