const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    latitude: { type: String },
    longitude: { type: String },
    code: { type: String },
    name: { type: String }
});

module.exports = mongoose.model("Location", locationSchema);