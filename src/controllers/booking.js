var service = require('../services/booking');
const emailService = require('../services/email')

let post = async(req, res) => {
    let booking = req.body;
    await service.create(booking).then(
        data => {
            emailService.sendMail(booking)
            return res.json(data)
        }, err => {
            console.log("err");
            return res.json(err)
        }
    );
};

module.exports = {
    post
}