const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema({
    name: { type: String},
    logo: { type: String }
});

module.exports = mongoose.model("Agency", agencySchema);