const router = require('express').Router();
const rooms = require("./room/controller");
const booking = require("./booking/contoller");

router.use("/rooms", rooms);
router.use("/booking", booking);

module.exports = router;