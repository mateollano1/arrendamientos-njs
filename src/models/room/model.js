const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    currency: { type: String },
    description: { type: String },
    images: [{ type: Object }],
    property_name: { type: String },
    thumbnail: { type: String },
    price: { type: Number },
    rating: { type: Number },
    agency: { type: Schema.Types.ObjectId, ref: "Agency" },
    location: { type: Schema.Types.ObjectId, ref: "Location"},
    services: [{ type: String }]
});

module.exports = mongoose.model("Room", roomSchema);