var router = require('express').Router();
var service = require('./service');

router.post("/", async (req, res) => {
    let booking = req.body;
    let boking = await service.create(booking);
    return res.json(boking);
})

module.exports = router