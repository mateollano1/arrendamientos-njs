var service = require('../services/booking');
const emailService = require('../services/email');
const validate = require('../helpers/datesHelpers');
const { formatBookingResponse, formatBooking } = require('../helpers/bookingHelper');

let post = async(req, res) => {
    try{
        let booking = req.body;
        let validation = await validate.validateDates(req.body.checkin, req.body.checkout);
        if (validation) {
            await service.create(booking).then(
                data => {
                    emailService.sendMail(booking)
                    data = formatBookingResponse(data);
                    return res.status(201).json(data)
                }, err => {
                    return res.status(400).json(err)
                }
            );
        } else {
            res.status(400).send({ error: 'Inconsistencia en datos ingresados' });
        }
    }
    catch(e){
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

let getBookings = async(req, res) => {
    try{
        let email = req.params.email;
        let bookings = await service.getBookingsByEmail(email);
    
        if (bookings) {
            // llamar los helpers
            bookings = bookings.map(data => {
                return formatBooking(data)
            })
            return res.status(200).json(bookings);
        }
        return res.status(404).json({ error: 'Inconsistencia en datos ingresados' });
    }
    catch(e){
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {
    post,
    getBookings
}