var service = require('../services/booking');

let post = async (req, res) => {
    let booking = req.body;
    let boking = await service.create(booking);
    return res.json(boking);
};

module.exports = {
    post
}