const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const USERMAIL = process.env.USERMAIL;
const PASSWORD = process.env.PASSWORD;

module.exports = {
    PORT: PORT,
    MONGODB: MONGODB,
    USERMAIL: USERMAIL,
    PASSWORD: PASSWORD
}