const router = require('express').Router();
const booking = require('../controllers/booking');
const auth = require('../controllers/auth');

router.post('/', auth.checkAuth, booking.post);
router.get('/:email', auth.checkAuth, booking.getBookings);

module.exports = router;