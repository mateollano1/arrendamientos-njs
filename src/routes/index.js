const router = require('express').Router();

const roomsRouter = require('./rooms');
const agencyRouter = require('./agency');
const locationRouter = require('./location');
const bookingRouter = require('./booking');

router.use('/rooms', roomsRouter);
router.use('/agency', agencyRouter);
router.use('/location', locationRouter);
router.use('/booking', bookingRouter);

module.exports = router;