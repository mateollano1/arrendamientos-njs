const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    checkin: { type: Date },
    checkout: { type: Date },
    id_room: { type: Schema.Types.ObjectId, ref: "Room"},
    id_user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Booking", BookingSchema);