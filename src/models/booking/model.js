const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    checkin: { type: Date, require: true},
    checkout: { type: Date, require:true },
    email: { type: String, require: true },
    name: {type: String, require: true},
    id_room: { type: Schema.Types.ObjectId, ref: "Room"}
});

module.exports = mongoose.model("Booking", BookingSchema);