const Booking = require('./model');


let create = (booking) => {
    let book = new Booking(booking);
    return book.save()
        .then(booking => booking)
        .catch(err => err);
}


module.exports = {
    create: create
}