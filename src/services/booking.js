const Booking = require('../models/booking/model');


let create = (booking) => {
    let book = new Booking(booking);
    return book.save()
        .then(booking => booking)
        .catch(err => err);
}


const getBooking = async (checkin, checkout) => {
    const booking = await Booking.find({'checkin' : {'$lte': checkin },'checkout' : {'$gte': checkout }},'id_room');
    return booking
}


module.exports = {
    create: create,
    getBooking
}