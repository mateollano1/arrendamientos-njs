var service = require('../services/booking');
const emailService = require('../services/email');
const validate = require('../helpers/datesHelpers');
const {formatBookingResponse} = require('../helpers/bookingHelper');

let post = async(req, res) => {
    let booking = req.body;
    let validation = await validate.validateDates(req.body.checkin, req.body.checkout)
    if (validation) {
        await service.create(booking).then(
            data => {
                emailService.sendMail(booking)
                data = formatBookingResponse(data);
                return res.json(data)
            }, err => {
                console.log("err");
                return res.json(err)
            }
        );
    } else {
        res.status(400).send({ error: 'Inconsistencia en datos ingresados' });
    }
};

module.exports = {
    post
}