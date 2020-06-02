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
                return res.status(200).json(data)
            }, err => {
                console.log("err");
                return res.status(400).json(err)
            }
        );
    } else {
        res.status(400).send({ error: 'Inconsistencia en datos ingresados' });
    }
};

let getBookings = async (req, res) => {
    let email = req.params.email;
    let bookings = await service.getBookingsByEmail(email);

    if(bookings && bookings.length > 0){
        // llamar los helpers
        return res.status(200).json(bookings);
    }
    return res.status(400).json({ error: 'Inconsistencia en datos ingresados' });
}

module.exports = {
    post,
    getBookings
}