var service = require('../services/booking');
const emailService = require('../services/email')

let post = async(req, res) => {
    let booking = req.body;
    let boking = await service.create(booking).then(
        data => {
            console.log(req.body.email);
            let checkIn = new Date(req.body.checkin);
            let checkOut = new Date(req.body.checkout);
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let checkInNew = `${checkIn.getDate()}/${checkIn.getMonth()}/${checkIn.getFullYear()}`
            let checkOutNew = `${checkOut.getDate()}/${checkOut.getMonth()}/${checkOut.getFullYear()}`
            emailService.sendMail(req.body.email, req.body.name, "de", diffDays, checkInNew, checkOutNew)
            return res.json(data)
        }, err => {
            console.log("err");
            return res.json(err)
        }

    );
    // return res.json(boking);
};

module.exports = {
    post
}