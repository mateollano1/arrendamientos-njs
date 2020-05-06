const router = require('express').Router();
const { createLocation, getLocations } = require('../controllers/location');

router.get('/location', getLocations);

router.post('/location', createLocation);

module.exports = router;
