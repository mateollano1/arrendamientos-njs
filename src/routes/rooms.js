const router = require('express').Router();
const { createRoom, getRooms, getRoomById } = require('../controllers/rooms');

router.get('/search', getRooms);

router.get('/:id', getRoomById);

router.post('/create', createRoom);

module.exports = router;
 