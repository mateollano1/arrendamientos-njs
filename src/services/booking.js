const Booking = require('../models/booking/model');


let create = (booking) => {
    let book = new Booking(booking);
    return book.save()
        .then(booking => booking)
        .catch(err => err);
}


const getBooking = async (checkin, checkout) => {
    checkin = new Date(checkin);
    checkout = new Date(checkout);
    const booking = await Booking.find(
        { $or: 
            [ 
                { $and: 
                    [
                        { "checkin": { $lte:  checkin } }, 
                        { "checkout": { $gte: checkin } }
                    ]
                },
                { $and: 
                    [
                        { "checkin": { $lte: checkout } }, 
                        { "checkout": { $gte: checkout } }
                    ]
                },
                { $and: [
                        { "checkin": { $gte: checkin } },
                        { "checkout": { $lte: checkout } },
                    ]
                },
                { $and: [
                        { "checkin": { $lte: checkin } },
                        { "checkout": { $gte: checkout } },
                    ]
                }
            ]
        }
        ,'id_room');
    return booking
}


module.exports = {
    create: create,
    getBooking
}

