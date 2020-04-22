var router = require('express').Router();
const rooms = require("./room/controller")

router.use("/rooms", rooms)

module.exports = router