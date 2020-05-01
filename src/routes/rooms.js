const router = require('express').Router();
const { createRoom, getRooms } = require('../controllers/rooms');

router.get('/search', getRooms);

router.post('/create', createRoom);

module.exports = router;
