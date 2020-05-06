const router = require('express').Router();
const { getAgencies, createAgency } = require('../controllers/agency');

router.get('/agency', getAgencies);

router.post('/agency', createAgency);

module.exports = router;
